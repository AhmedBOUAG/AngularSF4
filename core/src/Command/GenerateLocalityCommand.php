<?php

declare(strict_types=1);

namespace App\Command;

use App\Service\LocalityDataCsvExtractor;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:generate-locality',
    description: 'Generate locality data from CSV file',
    aliases: ['dfm:import-locality']
)]
class GenerateLocalityCommand extends Command
{
    public const FILENAME = 'laposte_hexasmal.csv';

    public function __construct(private LocalityDataCsvExtractor $extractor)
    {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $io->title('Importing localities from CSV file');

        $hasImportSucceeded = $this->extractor->importData(self::FILENAME, $output);

        if ($hasImportSucceeded) {
            $io->success('Localities have been successfully imported.');
            return Command::SUCCESS;
        } else {
            $io->warning('Something went wrong with importing localities !');
            return Command::FAILURE;
        }
    }
}
