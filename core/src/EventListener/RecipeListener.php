<?php

namespace App\EventListener;

use App\Entity\RecetteDFM;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;

class RecipeListener
{
    private UserInterface $loggedInUser;

    public function __construct(Security $security)
    {
        $this->loggedInUser = $security->getUser();
    }
    public function prePersist(LifecycleEventArgs $event)
    {
        $entity = $event->getObject();
        if (!$entity instanceof RecetteDFM) {
            return;
        }
        $entity->setCreator(creator: $this->loggedInUser);
    }
    public function preUpdate(LifecycleEventArgs $event)
    {
        $entity = $event->getObject();
        if (!$entity instanceof RecetteDFM) {
            return;
        }
        $entity->setUpdatedAt(new \DateTime('now'));
    }
}
