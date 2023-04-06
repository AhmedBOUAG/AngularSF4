<?php

namespace App\Config;

use App\Traits\CommonEnumTrait;

enum RecipeTransition: string
{
    case ToDraft = 'to_draft';
    case Reject = 'reject';
    case Publish = 'publish';

    use CommonEnumTrait;
}
