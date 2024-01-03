<?php

namespace App\EventSubscriber;

use App\Kernel;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class MessageSubscriber implements EventSubscriberInterface
{
    const ROUTE_EVENT_POST_MESSAGE = '_api_/messages{._format}_post';

    public function __construct(private Security $security)
    {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::REQUEST => ['onSetSenderMessage', 0],
        ];
    }


    public function onSetSenderMessage(RequestEvent $event): void
    {
        /** @var Request */
        $request = $event->getRequest();

        if ($request->get('_route') !== self::ROUTE_EVENT_POST_MESSAGE) {
            return;
        }

        if ('POST' !== $request->getMethod()) {
            return;
        }

        $request->attributes->all()['data']->setSender($this->security->getUser());
    }
}
