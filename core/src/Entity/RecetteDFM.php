<?php

declare(strict_types=1);

namespace App\Entity;

use App\Controller\Api\CreateRecetteAction;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\MaxDepth;

/**
 * @ApiResource(
 * normalizationContext={"groups"={"recette"}},
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
 *         },
 *         "get"
 *     },
 *     itemOperations={
 *         "get"
 *     }
 * )
 * @ORM\Entity(repositoryClass="App\Repository\RecetteDFMRepository")
 */
class RecetteDFM
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"recette"})
     */
    private int $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"recette"})
     */
    private string $title;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"recette"})
     */
    private ?string $subtitle = null;

    /**
     * @ORM\Column(type="string", length=30)
     * @Groups({"recette"})
     */
    private int $category = 1;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"recette"})
     */
    private ?string $city = null;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"recette"})
     */
    private ?string $zip = null;

    /**
     * @ORM\Column(type="float")
     * @Groups({"recette"})
     */
    private float $price = 0.00;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"recette"})
     */
    private $description;

    /**
     * @ORM\OneToMany(targetEntity="Image", mappedBy="recette", cascade={"persist", "remove"})
     * @ApiSubresource()
     * @Groups({"recette"})
     */
    private $images;

    public function __construct() {
        $this->images = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function setPrice(float $price): self
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
 
    public function getImages(): ?Collection
    {
        return $this->images;
    }

    public function setImages( Image $image): self
    {   
        $image->setRecette($this);
        $this->images->add($image);

        return $this;
    }
}