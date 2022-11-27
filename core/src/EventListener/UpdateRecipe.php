<?php

namespace App\EventListener;

use App\Entity\RecetteDFM;
use Doctrine\Persistence\Event\LifecycleEventArgs;

class UpdateRecipe
{
    public function PreUpdate(RecetteDFM $recette, LifecycleEventArgs $event)
    {

        if (!$event->getObject() instanceof RecetteDFM) {
            return null;
        }
        $recette->setUpdatedAt(new \DateTime('now'));
    }
}
