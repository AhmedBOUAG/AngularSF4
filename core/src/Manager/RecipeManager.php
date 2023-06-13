<?php

declare(strict_types=1);

namespace App\Manager;

use App\Entity\RecetteDFM;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Security;

class RecipeManager
{
    public function __construct(private EntityManagerInterface $em, private Security $security)
    {
    }

    public function isRecipeOwner(RecetteDFM $recette): bool
    {
        return $this->security->getUser() === $recette->getCreator();
    }
}
