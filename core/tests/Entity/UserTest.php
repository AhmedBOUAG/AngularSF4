<?php

namespace App\Tests\Entity;

use App\Entity\RecetteDFM;
use App\Entity\User;
use DateTime;
use PHPUnit\Framework\TestCase;

class UserTest extends TestCase
{
    private User $user;
    protected function setUp(): void
    {
        $this->user = new User();
    }

    public function testSetAndGetFirstname(): void
    {
        $this->user->setFirstname('John');
        $this->assertEquals('John', $this->user->getFirstname());
    }
    public function testSetAndGetLastname(): void
    {
        $this->user->setLastname('Doe');
        $this->assertEquals('Doe', $this->user->getLastname());
    }
    public function testSetAndGetUsername(): void
    {
        $this->user->setUsername('azerty');
        $this->assertEquals('azerty', $this->user->getUsername());
    }

    public function testSetAndGetEmail(): void
    {
        $this->user->setEmail('azerty@exemple.com');
        $this->assertEquals('azerty@exemple.com', $this->user->getEmail());
    }

    public function testSetAndGetRoles(): void
    {
        $this->user->setRoles(['ROLE_TESTEUR']);
        $this->assertEquals(['ROLE_TESTEUR'], $this->user->getRoles());
    }

    public function testSetAndGetPassword(): void
    {
        $this->user->setPassword('1234567');
        $this->assertEquals('1234567', $this->user->getPassword());
    }
    public function testSetAndGetBirthdate(): void
    {
        $pattern = 'd/m/Y';
        $date = DateTime::createFromFormat($pattern, '03/04/1997');
        $this->user->setBirthdate($date);
        $this->assertEquals($date->format($pattern), $this->user->getBirthdate()->format($pattern));
    }

    public function testGetCreatedAt(): void
    {
        $pattern = 'Y-m-d';
        $date = new \DateTimeImmutable();
        $this->assertEquals($date->format($pattern), $this->user->getCreatedAt()->format($pattern));
    }

    public function testAddRecetteDFM()
    {
        $recetteDFM = new RecetteDFM();

        $this->assertEquals(0, $this->user->getRecetteDFMs()->count());

        $this->user->addRecetteDFM($recetteDFM);

        $this->assertEquals(1, $this->user->getRecetteDFMs()->count());
        $this->assertTrue($this->user->getRecetteDFMs()->contains($recetteDFM));
        $this->assertSame($this->user, $recetteDFM->getCreator());
    }

    public function testRemoveRecetteDFM()
    {
        $recetteDFM = new RecetteDFM();
        $this->user->addRecetteDFM($recetteDFM);

        $this->user->removeRecetteDFM($recetteDFM);
        $this->assertEquals(0, $this->user->getRecetteDFMs()->count());
        $this->assertFalse($this->user->getRecetteDFMs()->contains($recetteDFM));
        $this->assertNull($recetteDFM->getCreator());
    }

    public function testGetSalt()
    {
        $this->assertNull($this->user->getSalt());
    }

    /** No property containing the plain password  */
    public function testEraseCredentials()
    {
        $pw = 'password';
        $this->user->setPassword($pw);

        $this->user->eraseCredentials();
        $this->assertNotEmpty($this->user->getPassword());
    }

    public function testGetClaims()
    {
        $this->user->setUsername('foo');
        $this->assertEquals(['username' => 'Foo', 'roles' => ['ROLE_USER'], 'id' => null], $this->user->getClaims());
    }

    public function testGetUserIdentifier()
    {
        $email = 'test@mail.us';
        $this->user->setEmail($email);
        $this->assertEquals($email, $this->user->getUserIdentifier());
    }
}
