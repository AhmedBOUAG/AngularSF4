<?php

declare(strict_types=1);

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

    public const RECIPE_REFERENCE = 'recipe_';
    public const NB_RECIPES = 30;

    public function load(ObjectManager $manager): void
    {
        $localities = $manager->getRepository(Locality::class)->findAll();
        $status = [RecipeStatus::Draft->value, RecipeStatus::Rejected->value];

        $faker = Faker\Factory::create('fr_FR');

        for ($nbRecipes = 0; $nbRecipes < self::NB_RECIPES; ++$nbRecipes) {
            $user = $this->getReference(UserFixtures::USER_REFERENCE . $faker->numberBetween(1, UserFixtures::NB_USERS));

            $recipe = new RecetteDFM();
            $recipe->setTitle($faker->sentence(5, true))
                ->setSubtitle($faker->sentence(6, true))
                ->setCategory(mt_rand(1, 3))
                ->setPrice(floatval(mt_rand(12, 34) . '.' . mt_rand(01, 99)))
                ->setDescription($faker->paragraphs(3, true))
                ->setCreator($user)
                ->setStatus($status[mt_rand(0, 1)])
                ->setLocality($faker->randomElement($localities))
                ->setCreatedAt($faker->dateTimeBetween('-2 years', '-5 days'))
                ->setUpdatedAt(match (mt_rand(0, 1)) {
                    0 => null,
                    1 => $faker->dateTimeBetween('-2 days')
                });

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
