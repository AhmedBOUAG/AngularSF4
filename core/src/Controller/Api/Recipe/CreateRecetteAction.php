<?php

namespace App\Controller\Api\Recipe;

use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use App\Entity\Image;
use App\Entity\RecetteDFM;
use App\Service\Workflow\RecipeWorkflow;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Serializer\NameConverter\CamelCaseToSnakeCaseNameConverter;

final class CreateRecetteAction
{
    public function __construct(private RecipeWorkflow $recipeWorkflow)
    {
    }
    public function __invoke(Request $request): RecetteDFM
    {
        $normalizer = new ObjectNormalizer(null, new CamelCaseToSnakeCaseNameConverter());
        $uploadedFiles = $request->files->get('images');
        $recette = $request->request->all();
        $state = $recette['state'];
        $recette = $normalizer->denormalize($recette, RecetteDFM::class);

        if (!$uploadedFiles) {
            throw new BadRequestHttpException('"file" is required');
        }

        foreach ($uploadedFiles as $uploadedFile) {
            $image = new Image();
            $image->setFile($uploadedFile);
            $recette->addImages($image);
        }

        $this->recipeWorkflow->process($recette, $state);

        return $recette;
    }
}
