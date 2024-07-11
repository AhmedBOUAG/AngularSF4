<?php

declare(strict_types=1);

namespace App\Traits;

trait CommonEnumTrait
{
    public static function getNames(): array
    {
        $cases = self::cases();

        return array_map(static fn (self $case) => $case->name, $cases);
    }

    public static function getValues(): array
    {
        $cases = self::cases();

        return array_map(static fn (self $case) => $case->value, $cases);
    }
}
