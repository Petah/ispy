<?php

namespace App\Helpers;

use Intervention\Image\ImageManagerStatic;

class Image
{
    public static function isValid(string $path): bool
    {
        if (!$path || !is_file($path)) {
            return false;
        }
        if (@is_array(getimagesize($path))) {
            switch (exif_imagetype($path)) {
                case IMAGETYPE_JPEG:
                case IMAGETYPE_PNG:
                    return true;
            }
        }
        return false;
    }

    public static function resizeImageFile(TempFile $imageFile, string $directory, int $size): TempFile
    {
        $image = ImageManagerStatic::make($imageFile->getPath());
        $image->orientate();
        if ($image->width() > $image->height()) {
            $image->resize($size, null, function ($constraint) {
                $constraint->upsize();
                $constraint->aspectRatio();
            });
        } else {
            $image->resize(null, $size, function ($constraint) {
                $constraint->upsize();
                $constraint->aspectRatio();
            });
        }
        $image->interlace(true);
        $thumbnail = TempFile::createUnique();
        $thumbnail->putContents((string) $image->encode('png'));
        return $thumbnail;
    }
}
