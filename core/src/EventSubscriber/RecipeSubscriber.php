<?php

declare(strict_types=1);

namespace App\EventSubscriber;

use App\Controller\Api\Recipe\CreateRecetteAction;
use App\Controller\Api\Recipe\EditRecetteAction;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ControllerEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class RecipeSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::CONTROLLER => [
                ['castAttributes', 2],
            ],
        ];
    }

    public function castAttributes(ControllerEvent $event): void
    {
        /** @var Request */
        $request = $event->getRequest();

        $controller = $event->getController();

        $affectedControllers = [CreateRecetteAction::class, EditRecetteAction::class];
        if ( ! is_array($controller) && ! in_array($controller::class, $affectedControllers, true)) {
            return;
        }

        if (in_array($request->getMethod(), ['POST', 'PUT'], true)) {
            $price = (float) $request->get('price');
            $category = trim($request->get('category'), '"');
            $request->request->set('price', $price);
            $request->request->set('category', intval($category));
        }
    }
}
