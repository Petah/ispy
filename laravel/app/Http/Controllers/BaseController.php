<?php

namespace App\Http\Controllers;

use App\Helpers\ErrorMessages;
use App\Helpers\InputData;
use App\Helpers\Json;
use App\Http\Request;
use App\Models\OrganizationUser;
use App\Models\User;
use App\Models\WhiteLabel;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Symfony\Component\Validator\Constraints;

class BaseController extends \Illuminate\Routing\Controller
{
    protected InputData $input;

    protected InputData $query;

    protected Request $request;

    protected ErrorMessages $errorMessages;

    protected ?User $userCurrent;

    protected ?OrganizationUser $organizationUserCurrent = null;

    protected ?WhiteLabel $whiteLabelCurrent;

    protected ?\Illuminate\Session\Store $session;

    public function __construct()
    {
        $this->errorMessages = new ErrorMessages();
        $this->middleware(function (Request $request, $next) {
            $this->request = $request;
            $this->input = new InputData(@json_decode($request->getContent(), true) ?: []);
            if ($this->input->isEmpty()) {
                $this->input = new InputData($request->request->all());
            }
            $this->query = new InputData($request->query());
            $this->userCurrent = $request->userCurrent;
            $this->organizationUserCurrent = $this->request->organizationUserCurrent;
            $this->whiteLabelCurrent = $request->whiteLabelCurrent;
            $this->session = $request->hasSession() ? $request->session() : null;
            return $next($request);
        });
    }

    protected function hasInput()
    {
        return $this->request->getMethod() === 'POST' && (!$this->input->isEmpty() || count($this->request->files) > 0);
    }

    protected function validateInput(array $fields)
    {
        $fields['_token'] = new \App\Constraints\Csrf([
            'user' => $this->userCurrent,
        ]);
        $fields['_recaptcha'] = new Constraints\Optional();
        $constraint = new Constraints\Collection([
            'fields' => $fields
        ]);
        $validator = \Symfony\Component\Validator\Validation::createValidator();
        $violations = $validator->validate($this->input->getData(), $constraint);
        foreach ($violations as $violation) {
            $inputName = preg_replace('/[\[\]]/', '', $violation->getPropertyPath(), 2);
            $this->errorMessages->add($inputName, $violation->getMessage());
        }

        return $this->errorMessages->isEmpty();
    }

    protected function flashMessage(string $type, string ...$newMessages)
    {
        if (empty($newMessages)) {
            throw new \Exception('Fash messages empty');
        }
        $messages = $this->session->get('flash-messages') ?: [];
        if (!isset($messages[$type])) {
            $messages[$type] = [];
        }
        foreach ($newMessages as $message) {
            $messages[$type][] = $message;
        }
        $this->session->put('flash-messages', $messages);
    }

    protected function render(string $view, array $data = [])
    {
        $data['userCurrent'] = $this->userCurrent;
        $data['organizationUserCurrent'] = $this->organizationUserCurrent;
        $data['whiteLabelCurrent'] = $this->whiteLabelCurrent;
        $data['errorMessages'] = $this->errorMessages;
        $data['session'] = $this->session;
        $data['request'] = $this->request;
        $data['input'] = $this->input;
        return Response::view($view, $data)
            ->header('Cache-Control', 'no-cache, must-revalidate');
    }

    protected function json($data, int $statusCode = 200, array $headers = [])
    {
        return Response::json($data, $statusCode, $headers)
            ->header('Cache-Control', 'no-cache, must-revalidate');
    }

    protected function noContent()
    {
        return Response::noContent()
            ->header('Cache-Control', 'no-cache, must-revalidate');
    }

    protected function notFound(?string $message = null)
    {
        throw new NotFoundHttpException($message);
    }

    protected function unauthorized(?string $message = null)
    {
        throw new UnauthorizedHttpException($message ?: '');
    }

    protected function redirect(string $url, string $message = null)
    {
        if ($message) {
            $this->flashMessage('success', $message);
        }
        return \redirect($this->request->getSchemeAndHttpHost() . $url)
            ->header('Cache-Control', 'no-cache, must-revalidate');
    }

    protected function removeCookie(string $cookieName)
    {
        Cookie::queue(Cookie::forget($cookieName));
    }

    protected function isOrganization(): bool
    {
        return $this->organizationUserCurrent ? true : false;
    }

    protected function hasPermission(string $permission): bool
    {
        return $this->userCurrent->hasPermission($permission, $this->organizationUserCurrent);
    }
}
