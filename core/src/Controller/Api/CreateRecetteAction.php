<?php

namespace App\Controller\Api;

use App\Entity\Image;
use App\Entity\RecetteDFM;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Serializer\Normalizer\DenormalizableInterface;
use Symfony\Component\Serializer\SerializerInterface;

final class CreateRecetteAction
{
    public function __invoke(Request $request,SerializerInterface $serializer): RecetteDFM
    {   
        $uploadedFiles = $request->files->get('images');
        $recette = $request->request->all();
       
        $recetteSerialize = $serializer->denormalize($recette, RecetteDFM::class);
        
        if (!$uploadedFiles) {
            throw new BadRequestHttpException('"file" is required');
        }
        
        foreach ($uploadedFiles as $uploadedFile) {
            $image = new Image();
            $image->setFile($uploadedFile);
            $recetteSerialize->setImages($image);
        }
        
        return $recetteSerialize;
    }
}