<?php

declare(strict_types=1);

namespace App\Config;

use App\Traits\CommonEnumTrait;

enum RecipeTransition: string
{
    use CommonEnumTrait;
    case ToDraft = 'to_draft';
    case Reject = 'reject';
    case Publish = 'publish';
}
