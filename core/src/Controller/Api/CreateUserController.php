<?php

namespace App\Controller\Api;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;


class CreateUserController 
{

    private $passwordEncoder;
    private $em;
    private $validator;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder, EntityManagerInterface $em, ValidatorInterface $validator)
    {
        $this->passwordEncoder = $passwordEncoder;
        $this->em = $em;
        $this->validator = $validator;
    }
    public function __invoke(User $data)
    {

        $errors = $this->validator->validate($data, null, ['registration']);
        
        if (count($errors) > 0) {
            /*
                A finir ;)
            */
            $errorsString = (string) $errors;

            return new Response($errorsString);
        }
        $user_mail = $data->getEmail();
         
        $data->setPassword($this->passwordEncoder->encodePassword($data, $data->getPassword() ));
       return $data;
    }
}