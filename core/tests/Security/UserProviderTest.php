<?php

namespace App\Tests\Security;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Security\UserProvider;
use PHPUnit\Framework\TestCase;
use stdClass;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\Exception\UserNotFoundException;

class UserProviderTest extends TestCase
{
    private UserRepository $userRepository;

    protected function setUp(): void
    {
        $this->userRepository = $this->createMock(UserRepository::class);
    }
    public function testLoadUserByIdentifierThrowsExceptionWhenUserNotFound(): void
    {
        $this->userRepository->method('loadUserByIdentifier')
            ->willReturn(null);

        $userProvider = new UserProvider($this->userRepository);

        $this->expectException(UserNotFoundException::class);
        $this->expectExceptionMessage('User with email "test@example.com" not found');

        $userProvider->loadUserByIdentifier('test@example.com');
    }

    public function testLoadUserByIdentifierReturnsUserWhenFound(): void
    {
        $user = new User();
        $this->userRepository->method('loadUserByIdentifier')
            ->willReturn($user);

        $userProvider = new UserProvider($this->userRepository);

        $result = $userProvider->loadUserByIdentifier('test@example.com');

        $this->assertSame($user, $result);
    }

    public function testLoadUserByUsername(): void
    {
        $user = new User();
        $user->setUsername('j.Doe123');

        $mockUserProvider = $this->createMock(UserProvider::class);
        $userProvider = new UserProvider($this->userRepository);

        $this->expectException(UserNotFoundException::class);

        $userProvider->loadUserByUsername($user->getUsername());
        $mockUserProvider->expects($this->once())
            ->method('loadUserByIdentifier')
            ->with('j.Doe123')
            ->willReturn($user);
    }

    public function testRefreshUser(): void
    {
        $user = $this->createMock(User::class);
        $user->method('getId')->willReturn(1);

        $mockUserRepository = $this->createMock(UserRepository::class);
        $mockUserRepository->expects($this->once())
            ->method('find')
            ->with(1)
            ->willReturn($user);

        $userProvider = new UserProvider($mockUserRepository);

        $refreshedUser = $userProvider->refreshUser($user);

        $this->assertEquals($user, $refreshedUser);
    }

    public function testRefreshUserWithUserExceptionNotFound(): void
    {
        $user = $this->createMock(User::class);
        $user->method('getId')->willReturn(1);

        $mockUserRepository = $this->createMock(UserRepository::class);
        $mockUserRepository->expects($this->once())
            ->method('find')
            ->with(1)
            ->willReturn(null);
        $this->expectException(UserNotFoundException::class);
        $userProvider = new UserProvider($mockUserRepository);

        $userProvider->refreshUser($user);
    }

    public function testSupportsClassReturnTrue(): void
    {

        $mockUserRepository = $this->createMock(UserRepository::class);
        $userProvider = new UserProvider($mockUserRepository);
        $this->assertTrue($userProvider->supportsClass(User::class));
    }

    public function testSupportsClassReturnFalse(): void
    {

        $mockUserRepository = $this->createMock(UserRepository::class);
        $userProvider = new UserProvider($mockUserRepository);
        $this->assertFalse($userProvider->supportsClass(stdClass::class));
    }
}
