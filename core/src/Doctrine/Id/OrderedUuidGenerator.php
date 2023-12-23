<?php

namespace App\Doctrine\Id;

use Doctrine\ORM\EntityManagerInterface;
use Ramsey\Uuid\Doctrine\UuidOrderedTimeGenerator;
use Ramsey\Uuid\Nonstandard\Uuid;
use Ramsey\Uuid\Provider\Node\RandomNodeProvider;
use Ramsey\Uuid\UuidInterface;

class OrderedUuidGenerator extends UuidOrderedTimeGenerator
{
    public function generate(EntityManagerInterface $em, $entity): UuidInterface
    {
        return Uuid::uuid6((new RandomNodeProvider())->getNode());
    }
}
