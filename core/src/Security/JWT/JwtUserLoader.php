<?php

namespace App\Security\JWT;

use Symfony\Bridge\Doctrine\Security\User\UserLoaderInterface;

class JwtUserLoader implements UserLoaderInterface
{
    public function loadUserByUsername($username)
    {
<<<<<<< HEAD
        // @todo Revoir cette methode sinon passage à SF6 afin de mettre la propriété getEmail() pour l'authentification.
=======
        dd('here');
>>>>>>> master
    }
}
