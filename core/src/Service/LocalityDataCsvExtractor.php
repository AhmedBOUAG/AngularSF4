<?php

namespace App\Service;

use App\Entity\Locality;
use App\Service\Interface\ExtractorInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Finder\Finder;

class LocalityDataCsvExtractor implements ExtractorInterface
{
    public const IMPORT_DIR_PATH = DIRECTORY_SEPARATOR.'public'.DIRECTORY_SEPARATOR.'imports'.DIRECTORY_SEPARATOR;
    public const AUTORIZED_HEADERS = ['Code_commune_INSEE', 'Nom_commune', 'Code_postal', 'Libellé_d_acheminement', 'coordonnees_geographiques'];

    public function __construct(private EntityManagerInterface $em)
    {
    }

    public function importData(string $fileName = null): bool
    {
        if (null === $fileName) {
            return false;
        }
        $finder = new Finder();
        $realPath = '';
        $finder->files()->in(dirname(dirname(__DIR__)).self::IMPORT_DIR_PATH);
        if (!$finder->hasResults()) {
            throw new \Exception('No file in the import directory.');
        }
        foreach ($finder as $file) {
            if ($file->getFilename() === $fileName) {
                $realPath = $file->getRealPath();
            }
        }

        return $this->handlerData($realPath);
    }

    private function handlerData($filePath): bool
    {
        $processed = false;
        $file = new \SplFileObject($filePath);
        $file->setFlags(\SplFileObject::READ_CSV);
        $csvHeaders = explode(';', $file->fgetcsv()[0]);
        if (array_diff(self::AUTORIZED_HEADERS, $csvHeaders)) {
            throw new \Exception('Some information is missing from the file.');
        }
        foreach ($file as $key => $row) {
            if (0 !== $key && !$file->eof()) {
                $processed = true;
                $locality = new Locality();
                $data = explode(';', $row[0]);
                $codepostal = 4 == strlen($data[2]) ? '0'.$data[2] : $data[2];
                $locality->setCodeCommune($data[0])
                    ->setNomCommune($data[1])
                    ->setCodePostal($codepostal)
                    ->setLibelle($data[4])
                    ->setCoordonneesGeo(floatval($data[5]).','.floatval($row[1]));
                $this->em->persist($locality);
            }
        }
        if ($processed) {
            $this->em->flush();
        }

        return $processed;
    }
}
