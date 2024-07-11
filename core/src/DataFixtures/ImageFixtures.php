<?php

declare(strict_types=1);

namespace App\DataFixtures;

use App\Config\RecipeStatus;
use App\Entity\Image;
use App\Entity\RecetteDFM;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Bundle\FixturesBundle\FixtureGroupInterface;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker;

class ImageFixtures extends Fixture implements DependentFixtureInterface, FixtureGroupInterface
{
    use ImageTrait;

    public function load(ObjectManager $manager): void
    {
        $recipes = $manager->getRepository(RecetteDFM::class)->findAll();
        $faker = Faker\Factory::create('fr_FR');
        $images = $this->getImagesFixtures();
        foreach ($images as $image) {
            $imageDTO = new Image();
            $imageDTO->setRecette($faker->randomElement($recipes));
            $imageDTO->getRecette()->setStatus(RecipeStatus::Published->value);
            $imageDTO->setName($image['name']);
            $imageDTO->setPath($image['path']);
            $imageDTO->setType($image['type']);
            $manager->persist($imageDTO);
        }
        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [RecipeFixtures::class];
    }

    public static function getGroups(): array
    {
        return ['dfm-group'];
    }
}
