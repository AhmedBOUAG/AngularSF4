<?php

namespace App\Controller\Api\Recipe;

use App\Entity\RecetteDFM;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class LatestRecipesAction extends AbstractController
{
    public function __construct(private EntityManagerInterface $entityMananger)
    {
    }
    public function __invoke()
    {
        $repository = $this->entityMananger->getRepository(RecetteDFM::class);

        return $repository->findBy([], ['createdAt' => 'DESC'], 4);
    }
}
