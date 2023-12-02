<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Controller\Api\User\UserConnected;
use App\Controller\Api\User\UserController;
use App\Controller\Api\User\UserFavoriteRecipesController;
use App\Repository\UserRepository;
use App\Traits\ResourceIdTrait;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[UniqueEntity(fields: ['email'], message: 'Un utilisateur est déjà enregistré sous cet adresse email')]
#[ApiResource(
    operations: [
        new Get(),
        new Put(),
        new GetCollection(),
        new Post(controller: UserController::class, uriTemplate: 'user/create'),
        new Post(
            controller: UserFavoriteRecipesController::class,
            uriTemplate: 'user/recipe/favorites'
        ),
    ],
    normalizationContext: ['groups' => ['user:read']],
    denormalizationContext: ['groups' => ['user:write']]
)]
class User implements UserInterface
{
    use ResourceIdTrait;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank(message: 'Vous devez saisir votre nom.')]
    #[Groups(['user:read', 'user:write'])]
    private $firstname;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank(message: 'Vous devez saisir votre prénom.')]
    #[Groups(['user:read', 'user:write'])]
    private $lastname;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank(message: 'Un pseudo est nécessaire pour l\'inscription.')]
    #[Groups(['user:read', 'user:write', 'recette:read'])]
    private $username;

    #[ORM\Column(type: 'string', unique: true, length: 255)]
    #[Assert\NotBlank(message: "Un email est obligatoire pour l'inscription")]
    #[Assert\Email(message: "L'adresse email {{ value }} n'est pas valide.")]
    #[Groups(['user:read', 'user:write'])]
    private $email;

    #[ORM\Column(type: 'json')]
    #[Groups(['user:read', 'user:write'])]
    private $roles = ['ROLE_USER'];

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank(message: "Un mot de passe est obligatoire pour l'inscription")]
    #[Assert\NotCompromisedPassword(message: 'Votre mot de passe est corrompu ! Veuillez en saisir un autre.')]
    #[Groups(['user:write'])]
    private $password;

    #[ORM\Column(type: 'date')]
    #[Assert\NotBlank(message: 'La date de naissance est obligatoire pour l\'inscription')]
    #[Assert\Type('DateTime')]
    #[Groups(['user:read', 'user:write'])]
    private $birthdate;

    #[ORM\Column(type: 'datetime', nullable: true)]
    #[Groups(['recette:read'])]
    private $createdAt;

    #[ORM\OneToMany(targetEntity: RecetteDFM::class, mappedBy: 'creator', cascade: ['persist', 'remove'], orphanRemoval: true)]
    #[Groups(['user:read'])]
    private $recetteDFMs;

    #[ORM\ManyToMany(targetEntity: RecetteDFM::class, inversedBy: 'users')]
    #[Groups(['user:read', 'user:write'])]
    private Collection $favoris;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->recetteDFMs = new ArrayCollection();
        $this->favoris = new ArrayCollection();
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

    /**
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
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

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getRoles(): array
    {
        return $this->roles;
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    public function getSalt(): ?string
    {
        return null;
    }

    public function eraseCredentials()
    {
    }

    public function getRecetteDFMs(): Collection
    {
        return $this->recetteDFMs;
    }

    public function addRecetteDFM(RecetteDFM $recetteDFM): self
    {
        if (!$this->recetteDFMs->contains($recetteDFM)) {
            $this->recetteDFMs[] = $recetteDFM;
            $recetteDFM->setCreator($this);
        }

        return $this;
    }

    public function removeRecetteDFM(RecetteDFM $recetteDFM): self
    {
        if (
            $this->recetteDFMs->removeElement($recetteDFM)
            && $recetteDFM->getCreator() === $this
        ) {
            $recetteDFM->setCreator(null);
        }

        return $this;
    }

    public function getClaims()
    {
        return ['username' => ucfirst($this->getUsername()), 'roles' => $this->getRoles(), 'id' => $this->getId()];
    }

    /**
     * @return Collection<int, RecetteDFM>
     */
    public function getFavoris(): Collection
    {
        return $this->favoris;
    }

    public function addFavoris(RecetteDFM $recette): self
    {
        if (!$this->favoris->contains($recette)) {
            $this->favoris->add($recette);
        }

        return $this;
    }

    public function removeFavoris(RecetteDFM $recette): self
    {
        if ($this->favoris->contains($recette)) {
            $this->favoris->removeElement($recette);
        }

        return $this;
    }
}
