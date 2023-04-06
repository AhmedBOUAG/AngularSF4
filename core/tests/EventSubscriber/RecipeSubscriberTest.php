<?php

namespace App\Tests\EventSubscriber;

use App\EventSubscriber\RecipeSubscriber;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\HttpKernelInterface;

class RecipeSubscriberTest extends TestCase
{
    /**
     * @dataProvider coveredMethods
     */
    public function testOnEditAttributesType(string $method): void
    {
        $request = Request::create('/recipes/1', $method, [
            'price' => '10.99',
            'category' => '"3"',
        ]);
        $event = new RequestEvent($this->createMock(HttpKernelInterface::class), $request, 1);

        $subscriber = new RecipeSubscriber();
        $subscriber->onEditAttributesType($event);

        $this->assertSame(10.99, $request->get('price'));
        $this->assertSame(3, $request->get('category'));
    }

    public static function coveredMethods(): array
    {
        return [['PUT'], ['POST']];
    }
}
