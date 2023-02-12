<?php

namespace App\Controller\Api\Recipe;

use App\Entity\RecetteDFM;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;

class RecipeController extends AbstractController
{

    public function __construct(private AuthorizationCheckerInterface $authorizationChecker)
    {
    }

    /**
     * @Route("/api/own_recipes", methods={"GET"})
     */
    public function getUserRecipes(Security $security): Response
    {
        if (!$this->authorizationChecker->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw new AccessDeniedHttpException();
        }

        return $this->json($this->getDoctrine()
            ->getRepository(RecetteDFM::class)
            ->findByAuthor($security->getUser()));
    }

    /**
     * @Route("/api/last_three_recipes", methods={"GET"})
     */
    public function getLastThreeRecipes(): Response
    {
        return $this->json($this->getDoctrine()
            ->getRepository(RecetteDFM::class)
            ->getLastThreeRecipes());
    }
}
