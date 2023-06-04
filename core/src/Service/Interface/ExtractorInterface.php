<?php

namespace App\Service\Interface;

interface ExtractorInterface
{
    public function importData(string $fileName = null): bool;
}
