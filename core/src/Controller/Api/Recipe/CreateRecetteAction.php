<?php

declare(strict_types=1);

namespace App\Controller\Api\Recipe;

use App\Entity\Image;
use App\Entity\Locality;
use App\Entity\RecetteDFM;
use App\Service\Workflow\RecipeWorkflow;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Serializer\NameConverter\CamelCaseToSnakeCaseNameConverter;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

final class CreateRecetteAction extends AbstractController
{
    public function __construct(private RecipeWorkflow $recipeWorkflow, private EntityManagerInterface $entityManagerInterface)
    {
    }

    public function __invoke(Request $request): RecetteDFM
    {
        $normalizer = new ObjectNormalizer(null, new CamelCaseToSnakeCaseNameConverter());
        $uploadedFiles = $request->files->get('images');
        $recette = $request->request->all();
        $status = $recette['status'];
        if ($locality_id = $recette['locality']) {
            $recette['locality'] = $this->entityManagerInterface->getRepository(Locality::class)->find($locality_id);
        }
        /** @var RecetteDFM $recette */
        $recette = $normalizer->denormalize($recette, RecetteDFM::class);

        if (!$uploadedFiles) {
            throw new BadRequestHttpException('"file" is required');
        }

        foreach ($uploadedFiles as $uploadedFile) {
            $image = new Image();
            $image->setFile($uploadedFile);
            $recette->addImages($image);
        }
        $recette->setCreator($this->getUser());
        $this->recipeWorkflow->process($recette, $status);

        return $recette;
    }
}
