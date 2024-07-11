<?php

namespace App\Tests\Entity;

use App\Entity\Image;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\File\File;

class ImageTest extends TestCase
{
    private Image $image;

    public function setUp(): void
    {
        $this->image = new Image;
    }

    public function testSetAndGetName(): void
    {
        $this->image->setName('azerty');
        $this->assertEquals('azerty', $this->image->getName());
    }

    public function testSetAndGetPath(): void
    {
        $this->image->setPath('abc/cde/f');
        $this->assertEquals('abc/cde/f',  $this->image->getPath());
    }
    public function testSetAndGetType(): void
    {
        $this->image->setType('jpeg');
        $this->assertEquals('jpeg',  $this->image->getType());
    }
    public function testSetAndGetFile(): void
    {
        $file = $this->createMock(File::class);
        $this->image->setFile($file);
        $this->assertEquals($file,  $this->image->getFile());
    }
}
