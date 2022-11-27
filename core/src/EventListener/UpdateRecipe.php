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
        //dd($event->getObject(), $recette);
        $recette->setUpdatedAt(new \DateTime('now'));
    }
}
