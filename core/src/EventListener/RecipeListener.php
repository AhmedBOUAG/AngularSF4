<?php

declare(strict_types=1);

namespace App\EventListener;

use App\Entity\RecetteDFM;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Symfony\Component\Security\Core\Security;

class RecipeListener
{
    public function __construct(private Security $security)
    {
    }

    public function preUpdate(LifecycleEventArgs $event): void
    {
        $entity = $event->getObject();
        if (!$entity instanceof RecetteDFM) {
            return;
        }
        $entity->setUpdatedAt(new \DateTime('now'));
    }
}
