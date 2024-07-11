<?php

namespace App\Tests\EventListener;

use App\Entity\RecetteDFM;
use App\Entity\User;
use App\EventListener\RecipeListener;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use PHPUnit\Framework\TestCase;
use stdClass;
use Symfony\Component\Security\Core\Security;

class RecipeListenerTest extends TestCase
{

    private Security $security;
    private LifecycleEventArgs $event;
    private RecipeListener $recipeListener;

    public function setUp(): void
    {
        $this->security = $this->createMock(Security::class);
        $this->event = $this->createMock(LifecycleEventArgs::class);
        $this->recipeListener = new RecipeListener($this->security);
    }

    public function testPrePersistReturnVoid(): void
    {
        $this->event->method('getObject')->willReturn(\stdClass::class);

        $this->assertNull($this->recipeListener->prePersist($this->event));
    }

    public function testPrePersistSetCreator(): void
    {
        // initier mon objet Recette.
        $recetteDFM = new RecetteDFM();
        // Je saisi l'objet User que je teste à la fin comparer que cet user qu'il est le même dans getUser et getCreator
        $user = new User();
        $user->setEmail('joe.doe@test.com');
        // preparer le retour de la methode getObject de l'objet lifecyleEventArgs
        $this->event->method('getObject')->willReturn($recetteDFM);
        // preparer le retour de la mehtode getUser de l'object security
        $this->security->method('getUser')->willReturn($user);

        // Test object reel
        $recipeListener = new RecipeListener($this->security);
        $recipeListener->prePersist($this->event);
        // Verification du test
        $this->assertEquals($user, $recetteDFM->getCreator());
    }

    public function testPreUpdateWithReturnVoid(): void
    {
        $this->event->method('getObject')->willReturn(\stdClass::class);
        $this->assertNull($this->recipeListener->preUpdate($this->event));
    }

    public function testPreUpdateWithNowDate(): void
    {
        $pattern = 'Y-m-d H:i:s';
        $recetteDFM = new RecetteDFM();
        $date = new \DateTime();
        $this->event->method('getObject')->willReturn($recetteDFM);

        $this->recipeListener->preUpdate($this->event);
        $this->assertEquals($date->format($pattern), $recetteDFM->getUpdatedAt()->format($pattern));
    }
}
