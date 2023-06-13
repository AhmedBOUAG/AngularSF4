<?php

declare(strict_types=1);

namespace App\Service\Workflow;

use App\Config\RecipeStatus;
use App\Config\RecipeTransition;
use App\Entity\RecetteDFM;
use Psr\Log\LoggerInterface;
use Symfony\Component\Workflow\Workflow;
use Symfony\Component\Workflow\WorkflowInterface;

class RecipeWorkflow
{
    private string $newPlace;

    public function __construct(private WorkflowInterface $recipeDfmStateMachine, private LoggerInterface $logger)
    {
    }

    public function process(RecetteDFM $recipe, string $place): void
    {
        $this->newPlace = $place;
        switch ($place) {
            case RecipeStatus::Draft->value:
                $this->toPlace($recipe, RecipeTransition::ToDraft->value);

                break;
            case RecipeStatus::Published->value:
                $this->toPlace($recipe, RecipeTransition::Publish->value);

                break;
            default:
                $this->toPlace($recipe, RecipeTransition::Reject->value);
        }
    }

    private function toPlace(RecetteDFM $recipe, string $transitionName): void
    {
        $oldPlace = $recipe->getStatus();

        if (0 === $recipe->getImages()->count()) {
            $transitionName = RecipeTransition::Reject->value;
        }
        if (
            in_array($recipe->getStatus(), RecipeStatus::getValues(), true)
            && $this->recipeDfmStateMachine->can($recipe, $transitionName)
        ) {
            try {
                $this->recipeDfmStateMachine->apply($recipe, $transitionName, [Workflow::DISABLE_ANNOUNCE_EVENT => true]);
                $this->logger->info(sprintf('The "%s" transition of the workflow from "%s" to "%s" has been successfully completed', $transitionName, $oldPlace, $this->newPlace));
            } catch (\LogicException $exception) {
                $this->logger->alert(sprintf('Workflow: exception raised when attempting to transition "%s", concerned recipe id: "%d", explanations message: %s', $transitionName, $recipe->getId(), $exception->getMessage()));
            }
        }
    }
}
