<?php

namespace App\Controller\Api\User;

use App\Security\AuthenticatedUser;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserAuthenticatedController extends AbstractController
{
    public function __construct(
        private AuthenticatedUser $tokenValidation
    ) {
    }

    public function __invoke()
    {
    }

    public function userAuthenticated(): JsonResponse
    {
        return new JsonResponse(['authenticated' => $this->tokenValidation->isAuthenticatedUser()]);
    }
}
