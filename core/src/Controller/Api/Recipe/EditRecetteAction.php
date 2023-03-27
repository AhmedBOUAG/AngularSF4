<?php

namespace App\Controller\Api\Recipe;

use App\Entity\Image;
use App\Entity\RecetteDFM;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Routing\Annotation\Route;


class EditRecetteAction
{
    public const EDIT_OPERATION = 'put_operation';
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }
    /*    #[Route(
        name: 'RecetteDFM_recipe_edit',
        path: '/recipes/{id}',
        methods: ['POST'],
        defaults: [
            '_api_resource_class' => RecetteDFM::class,
            '_api_operation_name' => '_api_/recipes/{id}',
        ],
    )]*/
    public function __invoke(RecetteDFM $data, Request $request, SerializerInterface $serializer)
    {
        $uploadedFiles = $request->files->get('images');
        $recetteToUpdate = $request->request->all();
        //dd($recetteToUpdate, $uploadedFiles);
        $deletedThumbnails = empty($recetteToUpdate['deletedThumbnails']) ? array() : explode(',', $recetteToUpdate['deletedThumbnails']);
        unset($recetteToUpdate['deletedThumbnails']);

        if (
            $data->getImages()->count() ===
            count($deletedThumbnails) &&
            !isset($uploadedFiles)
        ) {
            $this->em->remove($data);
            $this->em->flush();
            return new Response();
        }

        if ($deletedThumbnails !== []) {
            foreach ($deletedThumbnails as $img_id) {
                $imgToDelete = $this->em->getRepository(Image::class)->find($img_id);
                $data->removeImages($imgToDelete);
            }
        }

        $recetteUpdated = $serializer->deserialize(json_encode($recetteToUpdate), RecetteDFM::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $data]);
        if (isset($uploadedFiles)) {
            foreach ($uploadedFiles as $uploadedFile) {
                $image = new Image();
                $image->setFile($uploadedFile);
                //dd($image);
                $recetteUpdated->addImages($image);
            }
        }

        return $recetteUpdated;
    }
}
