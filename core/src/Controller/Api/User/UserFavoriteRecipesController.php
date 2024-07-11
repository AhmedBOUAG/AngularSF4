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
use Symfony\Component\HttpFoundation\JsonResponse;

class UserFavoriteRecipesController extends AbstractController
{
    public function __construct(private EntityManagerInterface $em, private RecetteDFMRepository $recipeRepository)
    {
    }

    public function __invoke(Request $request, RecipeManager $recipeManager): JsonResponse
    {
        /** @var User $user */
        $user = $this->getUser();
        $recetteId = json_decode($request->getContent(), true)['recipe_id'];
        $recette = $this->recipeRepository->find($recetteId);
        if (!$recette) {
            return new NotFoundHttpException('Not found recipe.');
        }
        if ($recipeManager->isRecipeOwner($recette)) {
            return new AccessDeniedException('Cannot add own recipe to favorites.');
        }
        $user->addFavoris($recette);
        $this->em->flush();

        return $this->json(['message' => 'Success']);
    }

    public function getLoggedInUserFavorites(): JsonResponse
    {
        /** @var User $user */
        $user = $this->getUser();

        return $this->json($user->getFavoris());
    }

    public function getUserFavoriteRecipeIds(?User $user = null): JsonResponse
    {
        if (!$user) {
            /** @var User $user */
            $user = $this->getUser();
        }

        return $this->json($user->getFavoris()->map(fn ($recipe) => $recipe->getId()));
    }

    public function removeFavoriteRecipe(int $id): JsonResponse
    {
        /** @var User $user */
        $user = $this->getUser();

        $recette = $this->recipeRepository->find($id);
        if (!$recette) {
            return new NotFoundHttpException('Not found recipe.');
        }
        $user->removeFavoris($recette);
        $this->em->flush();

        return $this->json(['message' => 'Deleted']);
    }
}
