<?php

declare(strict_types=1);

namespace App\Controller\Api\User;

use App\Entity\User;
use App\Manager\RecipeManager;
use App\Repository\RecetteDFMRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class UserFavorisRecipeController extends AbstractController
{
    public function __construct(private EntityManagerInterface $em, private RecetteDFMRepository $recipeRepository)
    {
    }

    public function __invoke(User $data, Request $request, RecipeManager $recipeManager)
    {
        $recetteId = json_decode($request->getContent(), true)['recette_id'];
        $recette = $this->recipeRepository->find($recetteId);
        if ( ! $recette) {
            return new NotFoundHttpException('Not found Recipe.');
        }
        if ($recipeManager->isRecipeOwner($recette)) {
            return new AccessDeniedException('cannot add own recipe to favorites.');
        }
        $data->addFavoris($recette);
        $this->em->flush();

        return $this->json($data);
    }
}
