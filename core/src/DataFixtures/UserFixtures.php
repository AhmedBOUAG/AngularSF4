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
    public function __construct(
        private UserPasswordHasherInterface $passwordHasher
    ) {
    }

    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');
        $populator = new Faker\ORM\Doctrine\Populator($faker, $manager);
        $populator->addEntity(User::class, 30, [], [
            function ($user) use ($faker) {
                $hashedPassword = $this->passwordHasher->hashPassword(
                    $user,
                    'test'
                );
                $user->setPassword($hashedPassword);
                $user->setBirthdate($faker->dateTimeBetween('-60 years', '-18 years'));
                $user->setCreatedAt($faker->dateTimeBetween('-7 years', '-5 years'));
            },
        ]);
        $populator->execute();
    }

    public static function getGroups(): array
    {
        return ['dfm-group'];
    }
}
