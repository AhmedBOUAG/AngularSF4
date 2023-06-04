<?php

namespace App\Controller\Api\Recipe;

use App\Entity\Image;
use App\Entity\RecetteDFM;
use App\Service\Workflow\RecipeWorkflow;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

class EditRecetteAction
{
    public const EDIT_OPERATION = 'put_operation';

    public function __construct(
        private EntityManagerInterface $em,
        private RecipeWorkflow $recipeWorkflow
    ) {
    }

    public function __invoke(RecetteDFM $data, Request $request, SerializerInterface $serializer)
    {
        $uploadedFiles = $request->files->get('images');
        $requestData = $request->request->all();
        $deletedThumbnails = empty($requestData['deletedThumbnails']) ? [] : explode(',', $requestData['deletedThumbnails']);
        unset($requestData['deletedThumbnails']);

        if ($deletedThumbnails) {
            foreach ($deletedThumbnails as $img_id) {
                $imgToDelete = $this->em->getRepository(Image::class)->find($img_id);
                $data->removeImages($imgToDelete);
            }
        }
        $options = [
            AbstractNormalizer::OBJECT_TO_POPULATE => $data,
            'ignored_attributes' => ['status'],
        ];
        if ($locality_id = $requestData['locality']) {
            $requestData['locality'] = "/api/localities/$locality_id";
        }
        $recetteUpdated = $serializer->deserialize(json_encode($requestData), RecetteDFM::class, 'json', $options);
        if (isset($uploadedFiles)) {
            foreach ($uploadedFiles as $uploadedFile) {
                $image = new Image();
                $image->setFile($uploadedFile);
                $recetteUpdated->addImages($image);
            }
        }
        $this->recipeWorkflow->process(recipe: $recetteUpdated, place: $requestData['status']);

        return $recetteUpdated;
    }
}
