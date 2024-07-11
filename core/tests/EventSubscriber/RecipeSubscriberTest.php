<?php

namespace App\Tests\EventSubscriber;

use App\Controller\Api\Recipe\CreateRecetteAction;
use App\EventSubscriber\RecipeSubscriber;
use App\Service\Workflow\RecipeWorkflow;
use Doctrine\ORM\EntityManagerInterface;
use PHPUnit\Framework\TestCase;
use stdClass;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ControllerEvent;
use Symfony\Component\HttpKernel\HttpKernelInterface;

use function PHPUnit\Framework\assertArrayHasKey;
use function PHPUnit\Framework\assertEquals;
use function PHPUnit\Framework\assertIsArray;
use function PHPUnit\Framework\assertNull;

class RecipeSubscriberTest extends TestCase
{
    private $createRecipeController;
    private $recipeWorkflow;
    private $recipeSubscriber;

    public function setUp(): void
    {
        $this->recipeWorkflow = $this->createMock(RecipeWorkflow::class);
        $this->createRecipeController = new CreateRecetteAction($this->recipeWorkflow, $this->createMock(EntityManagerInterface::class));
        $this->recipeSubscriber = new RecipeSubscriber();
    }

    /**
     * @dataProvider coveredMethods
     */
    public function testCastAttributesWhenProcessCastValues(string $method): void
    {
        $request = Request::create('/recipes/1', $method, [
            'price' => '10.99',
            'category' => '"3"',
        ]);
        $event = new ControllerEvent($this->createMock(HttpKernelInterface::class), $this->createRecipeController, $request, 1);

        $this->recipeSubscriber->castAttributes($event);

        $this->assertIsFloat($request->get('price'));
        $this->assertIsInt($request->get('category'));
        $this->assertEquals(10.99, $request->get('price'));
        $this->assertSame(3, $request->get('category'));
    }

    /**
     * @dataProvider coveredMethods
     */
    public function testCastAttributesWithNotSupportedController(string $method): void
    {
        $request = Request::create('/recipes/1', $method, [
            'price' => '10.99',
            'category' => '"3"',
        ]);
        $event = new ControllerEvent($this->createMock(HttpKernelInterface::class), function () {
            return new stdClass;
        }, $request, 1);

        assertNull($this->recipeSubscriber->castAttributes($event));
    }

    public function testGetSubscribedEvents()
    {
        $subscribedEvents = $this->recipeSubscriber->getSubscribedEvents();

        assertIsArray($subscribedEvents);
        assertArrayHasKey('kernel.controller', $subscribedEvents);
        assertIsArray($subscribedEvents['kernel.controller']);
        assertIsArray($subscribedEvents['kernel.controller'][0]);
        assertEquals('castAttributes', $subscribedEvents['kernel.controller'][0][0]);
    }

    public static function coveredMethods(): array
    {
        return [['PUT'], ['POST']];
    }
}
