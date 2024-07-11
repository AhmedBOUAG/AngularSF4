<?php

namespace App\Tests\Service\Workflow;

use PHPUnit\Framework\TestCase;
use App\Service\Workflow\RecipeWorkflow;
use App\Entity\RecetteDFM;
use App\Config\RecipeTransition;
use App\Config\RecipeStatus;
use App\Entity\Image;
use Symfony\Component\Workflow\WorkflowInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\Workflow\Workflow;

class RecipeWorkflowTest extends TestCase
{
    private RecipeWorkflow $recipeWorkflow;
    private WorkflowInterface $workflow;
    private LoggerInterface $logger;
    private $image;

    protected function setUp(): void
    {
        $this->workflow = $this->createMock(WorkflowInterface::class);
        $this->logger = $this->createMock(LoggerInterface::class);
        $this->image = $this->createMock(Image::class);
        $this->recipeWorkflow = new RecipeWorkflow($this->workflow, $this->logger);
    }
    /**
     * Test recipe workflow process
     * @dataProvider processTransitionDataProvider
     */
    public function testProcess(
        $currentPlace,
        $hasImage,
        $transition,
        $nextPlaceName
    ): void {
        $recipe = new RecetteDFM();
        $recipe->setStatus($currentPlace);
        if ($hasImage) {
            $recipe->addImages($this->image);
        }

        $this->workflow
            ->expects($this->once())
            ->method('can')
            ->with($recipe, $transition)
            ->willReturn(true);

        $this->workflow
            ->expects($this->once())
            ->method('apply')
            ->with($recipe, $transition, [Workflow::DISABLE_ANNOUNCE_EVENT => true]);

        $this->logger
            ->expects($this->once())
            ->method('info')
            ->with(sprintf('The "%s" transition of the workflow from "%s" to "%s" has been successfully completed', $transition, $recipe->getStatus(), $nextPlaceName));

        $this->recipeWorkflow->process($recipe, $nextPlaceName);
    }

    public static function processTransitionDataProvider(): array
    {
        return [
            [RecipeStatus::Published->value, true, RecipeTransition::ToDraft->value, RecipeStatus::Draft->value],
            [RecipeStatus::Draft->value, true, RecipeTransition::Publish->value, RecipeStatus::Published->value],
            [RecipeStatus::Published->value, false, RecipeTransition::Reject->value, RecipeStatus::Rejected->value],
            [RecipeStatus::Published->value, true, RecipeTransition::Reject->value, RecipeStatus::Rejected->value],
            [RecipeStatus::Rejected->value, true, RecipeTransition::ToDraft->value, RecipeStatus::Draft->value]
        ];
    }
}
