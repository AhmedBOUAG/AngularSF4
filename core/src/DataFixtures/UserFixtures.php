<?php

declare(strict_types=1);

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Bundle\FixturesBundle\FixtureGroupInterface;
use Doctrine\Persistence\ObjectManager;
use Faker;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture implements FixtureGroupInterface
{
    public const USER_REFERENCE = 'user_';
    public const NB_USERS = 30;

    public function __construct(private UserPasswordHasherInterface $passwordHasher)
    {
    }

    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');

        for ($nbUsers = 1; $nbUsers <= self::NB_USERS; $nbUsers++) {
            $user = new User();

            if ($nbUsers === 1)
                $user->setRoles(['ROLE_ADMIN']); // default : ['ROLE_USER'] pour les autres dans Entity User

            $user->setEmail($faker->unique()->email);
            $hashedPassword = $this->passwordHasher->hashPassword($user, 'test');
            $user->setPassword($hashedPassword);
            $user->setFirstname($faker->firstName);
            $user->setLastname($faker->lastName);
            $user->setUsername($faker->userName);
            $user->setBirthdate($faker->dateTimeBetween('-60 years', '-18 years'));
            $manager->persist($user);

            // On enregistre l'utilisateur dans une référence
            $this->addReference(self::USER_REFERENCE . $nbUsers, $user);
        }

        $manager->flush();
    }

    public static function getGroups(): array
    {
        return ['dfm-group'];
    }
}
