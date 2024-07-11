<?php

namespace App\Tests\Repository;

use App\Repository\ImageRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use PHPUnit\Framework\TestCase;

class ImageRepositoryTest extends TestCase
{
    private ManagerRegistry $manageRegistry;

    public function setUp(): void
    {
        $this->manageRegistry = $this->createMock(ManagerRegistry::class);
    }

    public function testConstruct(): void
    {
        $imageRepo = new ImageRepository($this->manageRegistry);
        $this->assertEquals(ImageRepository::class, $imageRepo::class);
    }
}
