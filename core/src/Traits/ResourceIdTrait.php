<?php

declare(strict_types=1);

namespace App\Traits;

trait ResourceIdTrait
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"recette:read"})
     */
    private $id;

    public function getId(): ?int
    {
        return $this->id;
    }
}
