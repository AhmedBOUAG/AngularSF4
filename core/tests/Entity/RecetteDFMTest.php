<?php

namespace App\Tests\Entity;

use App\Entity\Image;
use App\Entity\Locality;
use App\Entity\RecetteDFM;
use PHPUnit\Framework\TestCase;

class RecetteDFMTest extends TestCase
{
    private RecetteDFM $recipe;
    private Locality $locality;

    protected function setUp(): void
    {
        $this->recipe = new RecetteDFM();
        $this->locality = new Locality();
    }

    public function testGetAndSetTitle(): void
    {
        $this->recipe->setTitle('Recipe title');
        $this->assertEquals('Recipe title', $this->recipe->getTitle());
    }

    public function testGetAndSetSubtitle(): void
    {
        $this->recipe->setSubtitle('Sub Recipe title');
        $this->assertEquals('Sub Recipe title', $this->recipe->getSubtitle());
    }

    public function testGetAndSetCategory(): void
    {
        $this->recipe->setCategory(2);
        $this->assertEquals(2, $this->recipe->getCategory());
    }

    public function testGetAndSetLocality(): void
    {
        $this->locality->setCodePostal('75001');
        $this->recipe->setLocality($this->locality);
        $this->assertEquals('75001', $this->recipe->getLocality()->getCodePostal());
    }

    public function testGetAndSetPrice(): void
    {
        $this->recipe->setPrice(15.99);
        $this->assertEquals(15.99, $this->recipe->getPrice());
    }

    public function testGetAndSetDescription(): void
    {
        $this->recipe->setDescription('Lorem pitans katel');
        $this->assertEquals('Lorem pitans katel', $this->recipe->getDescription());
    }

    public function testGetAndSetCreatedAt(): void
    {
        $pattern = 'Y-m-d H:i:s';
        $date = new \DateTimeImmutable();
        $this->assertEquals($date->format($pattern), $this->recipe->getCreatedAt()->format($pattern));
    }

    public function testGetAndSetUpdatedAt(): void
    {
        $pattern = 'Y-m-d H:i:s';
        $date = new \DateTimeImmutable();
        $this->recipe->setUpdatedAt($date);
        $this->assertEquals($date->format($pattern), $this->recipe->getUpdatedAt()->format($pattern));
    }


    public function testRemoveRecetteDFM()
    {
        $image = new Image();
        $this->recipe->addImages($image);

        $this->recipe->removeImages($image);

        $this->assertEquals(0, $this->recipe->getImages()->count());
        $this->assertFalse($this->recipe->getImages()->contains($image));
        $this->assertNull($image->getRecette());
    }
}
