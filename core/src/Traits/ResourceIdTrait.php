<?php

declare(strict_types=1);

namespace App\Traits;

use ApiPlatform\Core\Annotation\ApiProperty;
use App\Doctrine\Id\OrderedUuidGenerator;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\UuidInterface;
use Symfony\Component\Serializer\Annotation\Groups;


trait ResourceIdTrait
{
    #[ORM\Id]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: OrderedUuidGenerator::class)]
    #[ApiProperty(identifier: true)]
    #[Groups(['recette:read', 'user:read', 'locality:read'])]
    protected ?UuidInterface $id = null;

    public function getId(): ?UuidInterface
    {
        return $this->id;
    }

    public function setId(?UuidInterface $id): self
    {
        $this->id = $id;

        return $this;
    }
}
