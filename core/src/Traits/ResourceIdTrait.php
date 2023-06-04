<?php

declare(strict_types=1);

namespace App\Traits;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

trait ResourceIdTrait
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['recette:read', 'user:read', 'locality:read'])]
    private $id;

    public function getId(): ?int
    {
        return $this->id;
    }
}
