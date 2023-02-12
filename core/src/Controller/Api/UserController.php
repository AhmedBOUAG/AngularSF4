<?php

namespace App\Controller\Api;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{

    public function __construct(
        private UserPasswordEncoderInterface $passwordEncoder,
        private EntityManagerInterface $em,
        private ValidatorInterface $validator
    ) {
    }
    public function __invoke(User $data)
    {
        $errors = $this->validator->validate($data, null, ['registration']);
        if (count($errors) > 0) {
            $errorsString = (string) $errors;

            return new Response($errorsString);
        }
        $data->setPassword($this->passwordEncoder->encodePassword($data, $data->getPassword()));

        return $data;
    }

    public function getClaimsCurrentUser()
    {
        $user = $this->getUser();
        if (!$user) {
            return;
        }

        return $this->json(['username' => $user->getUsername(), 'roles' => $user->getRoles()]);
    }
}