<?php

namespace App\Repository;

use App\Entity\RecetteDFM;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method RecetteDFM|null find($id, $lockMode = null, $lockVersion = null)
 * @method RecetteDFM|null findOneBy(array $criteria, array $orderBy = null)
 * @method RecetteDFM[]    findAll()
 * @method RecetteDFM[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RecetteDFMRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, RecetteDFM::class);
    }

    // /**
    //  * @return RecetteDFM[] Returns an array of RecetteDFM objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('r.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?RecetteDFM
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
