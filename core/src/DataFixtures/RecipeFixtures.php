<?php

namespace App\DataFixtures;

use App\Config\RecipeStatus;
use App\Entity\Locality;
use App\Entity\RecetteDFM;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Bundle\FixturesBundle\FixtureGroupInterface;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker;

class RecipeFixtures extends Fixture implements DependentFixtureInterface, FixtureGroupInterface
{
    use ImageTrait;

    public function load(ObjectManager $manager): void
    {
        $users = $manager->getRepository(User::class)->findAll();
        $localities = $manager->getRepository(Locality::class)->findAll();
        $faker = Faker\Factory::create('fr_FR');
        $status = [RecipeStatus::Draft->value, RecipeStatus::Rejected->value];
        for ($i = 0; $i < 300; ++$i) {
            $recipe = new RecetteDFM();
            $recipe->setTitle($faker->sentence(5, true))
                ->setSubtitle($faker->sentence(6, true))
                ->setCategory(rand(1, 3))
                ->setPrice(floatval(rand(12, 34).'.'.rand(01, 99)))
                ->setDescription($faker->paragraphs(3, true))
                ->setUpdatedAt($faker->dateTimeBetween('-2 years', '-5 days'))
                ->setUpdatedAt(match (rand(0, 1)) {
                    0 => null,
                    1 => $faker->dateTimeBetween('-2 days')
                })
                ->setCreator($faker->randomElement($users))
                ->setStatus($status[rand(0, 1)])
                ->setLocality($faker->randomElement($localities));
            $manager->persist($recipe);
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [UserFixtures::class];
    }

    public static function getGroups(): array
    {
        return ['dfm-group'];
    }
}
