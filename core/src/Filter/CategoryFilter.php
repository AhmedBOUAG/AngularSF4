<?php

namespace App\Filter;

use ApiPlatform\Doctrine\Orm\Filter\AbstractFilter;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Metadata\Operation;
use Doctrine\ORM\QueryBuilder;

class CategoryFilter extends AbstractFilter
{

    protected function filterProperty(string $property, $value, QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, Operation $operation = null, array $context = []): void
    {
        if (
            'category' !== $property
        ) {
            return;
        }
        $alias = $queryBuilder->getRootAliases()[0];
        $values = array_map('intval', explode(',', $value));
        if (!empty($values)) {
            $parameterName = $queryNameGenerator->generateParameterName($property);
            $queryBuilder
                ->andWhere(sprintf('%s.category IN (:%s)', $alias, $parameterName))
                ->setParameter($parameterName, $values);
        }
    }

    public function getDescription(string $resourceClass): array
    {
        $description['category'] = [
            'property' => 'category',
            'type' => 'string',
            'required' => false,
            'swagger' => [
                'description' => 'Filter by category',
                'name' => 'category',
                'type' => 'string',
            ],
        ];

        return $description ?? [];
    }
}
