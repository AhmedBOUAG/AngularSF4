<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use App\Controller\Api\Recipe\CreateRecetteAction;
use App\Controller\Api\Recipe\EditRecetteAction;
use App\Controller\Api\Recipe\LatestRecipesAction;
use App\Repository\RecetteDFMRepository;
use App\Traits\ResourceIdTrait;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use App\Filter\CategoryFilter;

#[Gedmo\Loggable]
#[ORM\Entity(repositoryClass: RecetteDFMRepository::class)]
#[ApiResource(
    types: ['https://schema.org/RecetteDFM'],
    operations: [
        new Get(),
        new Post(
            controller: EditRecetteAction::class,
            deserialize: false,
            uriTemplate: '/recipes/{id}.{_format}',
            openapiContext: [
                'requestBody' => [
                    'content' => [
                        'multipart/form-data' => [
                            'schema' => [
                                'type' => 'object',
                                'properties' => [
                                    'imagesUploaded' => [
                                        'type' => 'string',
                                        'format' => 'binary',
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
            name: '_api_/recipes.{_format}_edit',
        ),
        new Delete(),
        new Post(
            controller: CreateRecetteAction::class,
            deserialize: false,
            openapiContext: [
                'requestBody' => [
                    'content' => [
                        'multipart/form-data' => [
                            'schema' => [
                                'type' => 'object', 'properties' => [
                                    'images' => [
                                        'type' => 'string',
                                        'format' => 'binary',
                                    ],
                                    'title' => [
                                        'type' => 'string',
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
            ]
        ),
        new GetCollection(name: '_api_/recipes_get_collection'),
        new GetCollection(uriTemplate: 'last_three_recipes', controller: LatestRecipesAction::class),
        new GetCollection(uriTemplate: 'own_recipes', normalizationContext: ['groups' => ['recette:read']], security: "is_granted('IS_AUTHENTICATED_FULLY')"),
    ],
    shortName: 'recipe',
    normalizationContext: ['groups' => ['recette:read']],
    denormalizationContext: ['groups' => ['recette:write']],
    order: ['id' => 'DESC']
)]
#[ApiFilter(OrderFilter::class, properties: ['id', 'price'])]
#[ApiFilter(SearchFilter::class, properties: ['title' => 'partial', 'locality.libelle' => 'partial', 'subtitle' => 'partial', 'description' => 'partial', 'creator.username' => 'partial'])]
#[ApiFilter(CategoryFilter::class)]
class RecetteDFM
{
    use ResourceIdTrait;
    #[Gedmo\Versioned]
    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['recette:read', 'recette:write'])]
    private string $title;

    #[Gedmo\Versioned]
    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['recette:read', 'recette:write'])]
    private ?string $subtitle = null;

    #[Gedmo\Versioned]
    #[ORM\Column(type: 'integer', length: 30)]
    #[Groups(['recette:read', 'recette:write'])]
    private int $category = 0;

    #[ORM\Column(type: 'float')]
    #[Groups(['recette:read', 'recette:write'])]
    private ?float $price = 0.0;

    #[ORM\Column(type: 'text')]
    #[Groups(['recette:read', 'recette:write'])]
    private $description;

    #[ORM\Column(type: 'datetime')]
    #[Groups(['recette:read', 'recette:write'])]
    private $createdAt;

    #[ORM\Column(type: 'datetime', nullable: true)]
    #[Groups(['recette:read', 'recette:write'])]
    private $updatedAt;

    #[ORM\OneToMany(targetEntity: Image::class, mappedBy: 'recette', cascade: ['persist', 'remove'], orphanRemoval: true)]
    #[Groups(['recette:read', 'recette:write'])]
    private $images = [];

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'recetteDFMs')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['recette:read'])]
    private $creator;

    #[ORM\Column(length: 255, options: ['default' => 'draft'])]
    #[Groups(['recette:read', 'recette:write'])]
    private ?string $status = 'draft';

    #[ORM\ManyToMany(targetEntity: User::class, mappedBy: 'favoris')]
    private Collection $users;

    #[ORM\ManyToOne(targetEntity: Locality::class, inversedBy: 'recetteDFMs')]
    #[Groups(['recette:read', 'recette:write'])]
    private ?Locality $locality = null;

    public function __construct()
    {
        $this->images = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable();
        $this->users = new ArrayCollection();
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getSubtitle(): ?string
    {
        return $this->subtitle;
    }

    public function setSubtitle(string $subtitle): self
    {
        $this->subtitle = $subtitle;

        return $this;
    }

    public function getCategory(): ?int
    {
        return $this->category;
    }

    public function setCategory(int $category): self
    {
        $this->category = $category;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(?float $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getCreatedAt(): \DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setUpdatedAt(?\DateTimeInterface $date)
    {
        $this->updatedAt = $date;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function getImages(): ?Collection
    {
        return $this->images;
    }

    public function addImages(Image $image): self
    {
        if (!$this->images->contains($image)) {
            $this->images[] = $image;
            $image->setRecette($this);
        }

        return $this;
    }

    public function removeImages(Image $image): self
    {
        if ($this->images->contains($image)) {
            $this->images->removeElement($image);
            if ($image->getRecette() === $this) {
                $image->setRecette(null);
            }
        }

        return $this;
    }

    public function getCreator(): ?User
    {
        return $this->creator;
    }

    public function setCreator(?User $creator): self
    {
        $this->creator = $creator;

        return $this;
    }

    public function getStatus(): string
    {
        return $this->status;
    }

    public function setStatus(string $status = 'draft'): self
    {
        $this->status = $status;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users->add($user);
            $user->addFavoris($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->removeElement($user)) {
            $user->removeFavoris($this);
        }

        return $this;
    }

    public function getLocality(): ?Locality
    {
        return $this->locality;
    }

    public function setLocality(?Locality $locality): self
    {
        $this->locality = $locality;

        return $this;
    }

    public function __toString(): string
    {
        return $this->title;
    }
}
