<?php

declare(strict_types=1);

namespace App\Controller\Api\Recipe;

use App\Entity\RecetteDFM;
use App\Repository\RecetteDFMRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class LatestRecipesAction extends AbstractController
{
    public function __construct(private EntityManagerInterface $entityMananger)
    {
    }

    public function __invoke()
    {
        /** @var RecetteDFMRepository $repository */
        $repository = $this->entityMananger->getRepository(RecetteDFM::class);

        return $repository->findBy(['status' => 'published'], ['createdAt' => 'DESC'], 10);
    }
}
