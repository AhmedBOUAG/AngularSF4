<?php

namespace App\Controller\Api\Recipe;

use App\Entity\RecetteDFM;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;

class RecipeController extends AbstractController
{

    public function __construct(private EntityManagerInterface $entityManager, private AuthorizationCheckerInterface $authorizationChecker)
    {
    }

    #[Route(path: '/api/own_recipes', methods: ['GET'])]
    public function getUserRecipes(Security $security): Response
    {
        if (!$this->authorizationChecker->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw new AccessDeniedHttpException();
        }

        return $this->json($this->entityManager
            ->getRepository(RecetteDFM::class)
            ->findByCreator($security->getUser()), 200, [], ['groups' => ['recette:read']]);
    }
}
