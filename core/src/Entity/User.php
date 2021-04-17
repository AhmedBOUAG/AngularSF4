<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Controller\UserController;
use App\Repository\UserRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *    normalizationContext={"groups"={"user:read"}},
 *    denormalizationContext={"groups"={"user:write"}},
 *    collectionOperations={
 *      "get"={"method"="GET"},
 *      "post"={
 *          "controller"=App\Controller\Api\CreateUserController::class   
 *       }
 *     },
 *     itemOperations={
 *      "get"={"method"="GET"},
 *      "put"={"method"="PUT"}
 *     },
 * )
 * @ORM\Entity(repositoryClass=UserRepository::class)
 */
class User implements UserInterface, \Serializable
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"user:read"})
     */
    private $id;

    /**
     * @Assert\NotBlank(
     *    message = "Vous devez saisir votre nom."
     * )
     * @ORM\Column(type="string", length=255)
     * @Groups({"user:read", "user:write"})
     */
    private $firstname;

    /**
     * @Assert\NotBlank(
     *    message = "Vous devez saisir votre prénom."
     * )
     * @ORM\Column(type="string", length=255)
     * @Groups({"user:read", "user:write"})
     */
    private $lastname;

    /**
     * @Assert\NotBlank(
     *    message = "Un pseudo est obligatoire pour l'inscription"
     * )
     * @ORM\Column(type="string", length=255)
     * @Groups({"user:read", "user:write"})
     */
    private $username;

    /**
     * @Assert\NotBlank(
     *    message = "Un email est obligatoire pour l'inscription"
     * )
     * @Assert\Email(
     *     message = "L'adresse email {{ value }} n'est pas valide."
     * )
     * @ORM\Column(type="string", length=255)
     * @Groups({"user:read", "user:write"})
     */
    private $email;

    /**
     * @Assert\NotBlank(
     *    message = "Un mot de passe est obligatoire pour l'inscription"
     * )
     * @Assert\NotCompromisedPassword(
     *    message = "Votre mot de passe est corrompu ! Veuillez en saisir un autre."
     * )
     * @ORM\Column(type="string", length=255)
     * @Groups({"user:write"})
     */
    private $password;

    /**
     * @Assert\Date(
     *    message = "Le format de la date n'est pas valide."
     * )
     * @Assert\NotBlank(
     *    message = "La date de naissance est obligatoire pour l'inscription"
     * )
     * @ORM\Column(type="date")
     * @Groups({"user:read", "user:write"})
     */
    private $birthdate;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"user:read"})
     */
    private $createdAt;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getBirthdate(): ?\DateTimeInterface
    {
        return $this->birthdate;
    }

    public function setBirthdate(\DateTimeInterface $birthdate): self
    {
        $this->birthdate = $birthdate;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    /**
     * 
     * @return (Role|string)[] the user roles
     */

    public function getRoles()
    {
        return ['ROLE_USER'];
    }

    /*
     * 
     * @return string|null the salt     
     */

    public function getSalt()
    {
        return  null;
    }

    public function eraseCredentials()
    {
    }
    public function serialize()
    {
        return serialize([
            $this->id,
            $this->username,
            $this->password
        ]);
    }
    public function unserialize($serialized)
    {

        list(
            $this->id,
            $this->username,
            $this->password
        ) = unserialize($serialized, ['allowed_classes' => false]);
    }
}
