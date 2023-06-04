<?php

namespace App\EventListener;

use App\Entity\RecetteDFM;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Symfony\Component\Security\Core\Security;

class RecipeListener
{
    public function __construct(private Security $security)
    {
    }

    public function prePersist(LifecycleEventArgs $event): void
    {
        $entity = $event->getObject();
        if (!$entity instanceof RecetteDFM) {
            return;
        }
        $entity->setCreator(creator: $this->security->getUser());
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
