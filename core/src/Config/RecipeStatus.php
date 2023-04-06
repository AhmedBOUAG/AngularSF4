<?php

namespace App\Config;

use App\Traits\CommonEnumTrait;

enum RecipeStatus: string
{
    case Draft = 'draft';
    case Rejected = 'rejected';
    case Published = 'published';

    use CommonEnumTrait;
}
