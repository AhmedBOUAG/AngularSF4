<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestMatcherInterface;

class AuthRequestMatcher implements RequestMatcherInterface
{

    public function matches(Request $request)
    {
    }
}
