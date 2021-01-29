<?php

namespace App\Exceptions;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class Handler extends \Illuminate\Foundation\Exceptions\Handler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Throwable  $exception
     * @return void
     *
     * @throws \Exception
     */
    public function report(\Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Throwable
     */
    public function render($request, \Throwable $exception)
    {
        if ($request->is('api/*')) {
            return static::renderApi($request, $exception);
        }

        return parent::render($request, $exception);
    }


    public static function renderApi($request, \Throwable $exception)
    {
        if ($exception instanceof NotFoundHttpException || $exception instanceof ModelNotFoundException) {
            return static::jsonApiResponse([
                'errors' => [[
                    'message' => 'Not found.',
                    'meta' => [
                        'method' => $request->method(),
                    ],
                ]],
            ], 404);
        }
        if ($exception instanceof MethodNotAllowedHttpException) {
            return static::jsonApiResponse([
                'errors' => [[
                    'detail' => 'HTTP method not allowed.',
                    'meta' => [
                        'method' => $request->method(),
                    ],
                ]],
            ], 405);
        }
        return static::jsonApiResponse([
            'error' => static::serializeException($exception),
        ], 500);
    }

    protected static function serializeException($exception = null)
    {
        if (!$exception) {
            return null;
        }
        if (!\config('app.debug')) {
            return [
                'message' => $exception->getMessage() ?: 'An unknown error has occurred: ' . get_class($exception),
            ];
        }
        return [
            'message' => $exception->getMessage() ?: 'An unknown error has occurred: ' . get_class($exception),
            'type' => get_class($exception),
            'line' => $exception->getLine(),
            'file' => $exception->getFile(),
            'trace' => array_map(function ($trace) {
                return (isset($trace['line']) ? '#' . $trace['line'] . ': ' : '(no line number) ') .
                    (isset($trace['file']) ? $trace['file'] . ' -- ' : '(no file) -- ') .
                    (isset($trace['class']) ? $trace['class'] : '') .
                    (isset($trace['type']) ? $trace['type'] : '') .
                    (isset($trace['function']) ? $trace['function'] : '');
            }, $exception->getTrace()),
            'context' => method_exists($exception, 'getContext') ? $exception->getContext() : null,
            'previous' => static::serializeException($exception->getPrevious()),
        ];
    }

    private static function jsonApiResponse(array $data, int $statusCode): \Illuminate\Http\JsonResponse
    {
        $response = \response()->json($data, $statusCode);
        static::setCorsHeaders($response);
        return $response;
    }

    private static function setCorsHeaders(\Illuminate\Http\JsonResponse $response)
    {
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
        $response->headers->set('Access-Control-Max-Age', '3600');
    }
}
