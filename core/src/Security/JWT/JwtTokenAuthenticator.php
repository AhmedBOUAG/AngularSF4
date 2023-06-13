<?php

declare(strict_types=1);

namespace App\Security\JWT;

use App\Security\UserProvider;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\TokenExtractor\TokenExtractorInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;
use Symfony\Contracts\EventDispatcher\EventDispatcherInterface;

class JwtTokenAuthenticator extends AbstractAuthenticator
{
    public function __construct(
        private JWTEncoderInterface $jwtEncoder,
        private JWTTokenManagerInterface $jwtManager,
        private EventDispatcherInterface $dispatcher,
        private TokenExtractorInterface $tokenExtractor,
        private UserProvider $userProvider,
    ) {
    }

    public function supports(Request $request): bool
    {
        return $request->headers->has('authorization')
            && 0 === mb_strpos($request->headers->get('authorization'), 'Bearer ');
    }

    public function getToken(Request $request)
    {
        return $this->tokenExtractor->extract($request);
    }

    public function authenticate(Request $request): ?Passport
    {
        $token = $this->getToken($request);
        if (null === $token) {
            throw new CustomUserMessageAuthenticationException('No API token provided');
        }
        $claims = $this->jwtEncoder->decode($token);
        if ( ! $claims) {
            return null;
        }
        $userIdentifier = $claims[$this->jwtManager->getUserIdClaim()];

        return new SelfValidatingPassport(
            new UserBadge($userIdentifier, function () use ($userIdentifier) {
                return $this->userProvider->loadUserByIdentifier($userIdentifier);
            })
        );
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        $data = [
            'message' => strtr($exception->getMessageKey(), $exception->getMessageData()),
        ];

        return new JsonResponse($data, Response::HTTP_UNAUTHORIZED);
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey): ?Response
    {
        return null;
    }

    public function supportsRememberMe(): bool
    {
        return false;
    }
}
