<?php

declare(strict_types=1);

namespace App\Service\Interface;

interface ExtractorInterface
{
    public function importData(string $fileName = null): bool;
}
