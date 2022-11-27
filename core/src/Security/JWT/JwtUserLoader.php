<?php

namespace App\Security\JWT;

use Symfony\Bridge\Doctrine\Security\User\UserLoaderInterface;

class JwtUserLoader implements UserLoaderInterface
{
    public function loadUserByUsername($username)
    {
        dd('here');
    }
}
