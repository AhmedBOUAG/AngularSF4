<?php

namespace App\Security;

use Symfony\Component\Security\Core\Security;

class AuthenticatedUser
{
    public function __construct(
        private Security $security,
    ) {
    }

    public function isAuthenticatedUser(): bool
    {
        if ($this->security->isGranted('IS_AUTHENTICATED_FULLY')) {
            return true;
        }

        return false;
    }
}
