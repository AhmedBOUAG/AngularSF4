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
        return $this->security->isGranted('IS_AUTHENTICATED_FULLY');
    }
}
