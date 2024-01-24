<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\Locality;
use App\Service\Interface\ExtractorInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Helper\ProgressBar;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Finder\Finder;

class LocalityDataCsvExtractor implements ExtractorInterface
{
    public const IMPORT_DIR_PATH = DIRECTORY_SEPARATOR . 'public' . DIRECTORY_SEPARATOR . 'imports' . DIRECTORY_SEPARATOR;
    public const AUTHORIZED_HEADERS = ['Code_commune_INSEE', 'Nom_commune', 'Code_postal', 'Libellé_d_acheminement', 'coordonnees_geographiques'];

    public function __construct(private EntityManagerInterface $em)
    {
    }

    public function importData(string $fileName = null, OutputInterface $output): bool
    {
        if (null === $fileName) {
            return false;
        }

        $realPath = '';
        $importDirectory = dirname(dirname(__DIR__)) . self::IMPORT_DIR_PATH;
        $finder = new Finder();
        $finder->files()->in($importDirectory);

        if (!$finder->hasResults()) {
            throw new \Exception('[IMPORT-FILE] No file found in the import directory : ' . $importDirectory);
        }

        foreach ($finder as $file) {
            if ($file->getFilename() === $fileName) {
                $realPath = $file->getRealPath();
            }
        }

        if (empty($realPath)) {
            throw new \Exception('[IMPORT-FILE] The file "' . $fileName . '" is not found in the import directory : ' . $importDirectory);
        }

        return $this->handlerData($realPath, $output);
    }

    private function handlerData(string $filePath, OutputInterface $output): bool
    {
        $processed = false;
        $file = new \SplFileObject($filePath);
        $file->setFlags(\SplFileObject::READ_CSV);
        $csvHeaders = explode(';', $file->fgetcsv()[0]);

        // Lire les lignes du fichier CSV dans un tableau et Compter le nombre de lignes
        $fileLines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        $totalNbLines = count($fileLines) - 1;

        $progressBar = new ProgressBar($output, $totalNbLines);

        if (array_diff(self::AUTHORIZED_HEADERS, $csvHeaders)) {
            throw new \Exception('[FILE INTEGRITY] Some information is missing from the file.');
        }

        $nbProcessed = 0;
        foreach ($file as $key => $row) {
            if (0 !== $key && !$file->eof()) {
                $data = explode(';', $row[0]);
                $locality = new Locality();
                $codePostal = str_pad($data[2], 5, "0", STR_PAD_LEFT);
                $locality->setCodeCommune($data[0])
                    ->setNomCommune($data[1])
                    ->setCodePostal($codePostal)
                    ->setLibelle($data[4])
                    ->setCoordonneesGeo(floatval($data[5]) . ',' . floatval($row[1]));
                $this->em->persist($locality);
                $nbProcessed++;
                $progressBar->advance();
            }
        }

        if ($nbProcessed === $totalNbLines) {
            $this->em->flush();
            $progressBar->finish();
            $processed = true;
        }
        $output->writeln(['', '']);

        return $processed;
    }
}
