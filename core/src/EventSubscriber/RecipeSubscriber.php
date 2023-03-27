<?php

namespace App\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class RecipeSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::REQUEST => [
                ['onEditAttributesType', 2]
            ],
        ];
    }

    public function onEditAttributesType(RequestEvent $event)
    {
        $request = $event->getRequest();
        if (in_array($request->getMethod(), ['POST', 'PUT'])) {
            $price = (float) $request->get('price');
            $category = trim($request->get('category'), '"');
            $request->request->set('price', $price);
            $request->request->set('category', (int) $category);
        }
    }
}
