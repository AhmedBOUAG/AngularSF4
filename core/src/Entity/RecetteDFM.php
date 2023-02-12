<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use App\Controller\Api\Recipe\CreateRecetteAction;
use App\Controller\Api\Recipe\EditRecetteAction;
use App\Traits\ResourceIdTrait;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 * normalizationContext={"groups"={"recette:read"}},
 * denormalizationContext={"groups"={"recette:write"}},
 *    collectionOperations={
 *         "post"={
 *             "controller"=CreateRecetteAction::class,
 *             "deserialize"=false,          
 *             "openapi_context"={
 *                 "requestBody"={
 *                     "content"={
 *                         "multipart/form-data"={
 *                             "schema"={
 *                                 "type"="object",
 *                                 "properties"={
 *                                     "images"={
 *                                         "type"="string",
 *                                         "format"="binary"
 *                                     },
 *                                     "title"={
 *                                         "type"="string"
 *                                     }
 *                                 }
 *                             }
 *                         }
 *                     }
 *                 }
 *             }
 *         }
 *     },
 *     itemOperations={
 *         "get",
 *          EditRecetteAction::EDIT_OPERATION={
 *             "controller"=EditRecetteAction::class,
 *              "method"="post",
 *             "deserialize"=false,
 *             
 *             "openapi_context"={
 *                 "requestBody"={
 *                     "content"={
 *                         "multipart/form-data"={
 *                             "schema"={
 *                                 "type"="object",
 *                                 "properties"={
 *                                     "imagesUploaded"={
 *                                         "type"="string",
 *                                         "format"="binary"
 *                                     }                                
 *                                 }
 *                             }
 *                         }
 *                     }
 *                 }
 *             }
 *         },
 *         "DELETE"
 *     }
 * )
 * @ORM\Entity(repositoryClass="App\Repository\RecetteDFMRepository")
 */
class RecetteDFM
{
    use ResourceIdTrait;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"recette:read", "recette:write"})
     */
    private string $title;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"recette:read", "recette:write"})
     */
    private ?string $subtitle = null;

    /**
     * @ORM\Column(type="integer", length=30)
     * @Groups({"recette:read", "recette:write"})
     */
    private int $category = 0;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"recette:read", "recette:write"})
     */
    private ?string $city = null;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"recette:read", "recette:write"})
     */
    private ?string $zip = null;

    /**
     * @ORM\Column(type="float")
     * @Groups({"recette:read", "recette:write"})
     */
    private ?float $price = 0.00;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"recette:read", "recette:write"})
     */
    private $description;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"recette:read", "recette:write"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"recette:read", "recette:write"})
     */
    private $updatedAt = null;

    /**
     * @ORM\OneToMany(targetEntity="Image", mappedBy="recette", cascade={"persist", "remove"}, orphanRemoval=true)
     * @ApiSubresource()
     * @Groups({"recette:read", "recette:write"})
     */
    private $images = [];

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="recetteDFMs")
     * @ORM\JoinColumn(nullable=false)
     * @MaxDepth(1)
     */
    private $creator;


    public function __construct()
    {
        $this->images = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable();
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

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getZip(): ?string
    {
        return $this->zip;
    }

    public function setZip(string $zip): self
    {
        $this->zip = $zip;

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

    public function setUpdatedAt(?DateTimeInterface $date)
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
            // set the owning side to null (unless already changed)
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
}
