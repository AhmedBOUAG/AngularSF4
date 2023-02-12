<?php

namespace App\Controller\Api\Recipe;

use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use App\Entity\Image;
use App\Entity\RecetteDFM;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\NameConverter\CamelCaseToSnakeCaseNameConverter;
use Symfony\Component\Serializer\Normalizer\DenormalizableInterface;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\SerializerInterface;

final class CreateRecetteAction
{
    public function __invoke(Request $request): RecetteDFM
    {
        $normalizer = new ObjectNormalizer(null, new CamelCaseToSnakeCaseNameConverter());
        $uploadedFiles = $request->files->get('images');
        $recette = $request->request->all();
        $recette = $normalizer->denormalize($recette, RecetteDFM::class);

        if (!$uploadedFiles) {
            throw new BadRequestHttpException('"file" is required');
        }

        foreach ($uploadedFiles as $uploadedFile) {
            $image = new Image();
            $image->setFile($uploadedFile);
            $recette->addImages($image);
        }

        return $recette;
    }
}
