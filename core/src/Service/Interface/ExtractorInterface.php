<?php

declare(strict_types=1);

namespace App\Service\Interface;

use Symfony\Component\Console\Output\OutputInterface;

interface ExtractorInterface
{
    public function importData(string $fileName = null, OutputInterface $output): bool;
}
