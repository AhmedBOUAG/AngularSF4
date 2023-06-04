<?php

namespace App\Config;

use App\Traits\CommonEnumTrait;

enum RecipeStatus: string
{
    use CommonEnumTrait;
    case Draft = 'draft';
    case Rejected = 'rejected';
    case Published = 'published';
}
