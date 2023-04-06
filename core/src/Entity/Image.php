<?php

namespace App\Entity;

use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\ApiResource;
use App\Entity\RecetteDFM;
use App\Traits\ResourceIdTrait;
use App\Repository\ImageRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[Vich\Uploadable]
#[ApiResource]
/*#[ApiResource(
    uriTemplate: '/recipes/{id}/images.{_format}',
    uriVariables: ['id' => new Link(fromClass: \App\Entity\RecetteDFM::class, identifiers: ['id'], toProperty: 'recette')],
    status: 200,
    operations: [new GetCollection()]
)]*/
#[ORM\Entity(repositoryClass: ImageRepository::class)]
class Image
{
    use ResourceIdTrait;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['recette:read', 'recette:write'])]
    private ?string $name = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(['recette:read', 'recette:write'])]
    private ?string $path = null;

    #[Vich\UploadableField(mapping: 'image_object', fileNameProperty: 'name', mimeType: 'type', size: 'path')]
    private File $file;

    #[ORM\Column(type: 'string', length: 25)]
    #[Groups(['recette:read', 'recette:write'])]
    private ?string $type = null;

    #[ORM\ManyToOne(targetEntity: RecetteDFM::class, inversedBy: 'images')]
    #[ORM\JoinColumn(nullable: true)]
    private $recette;

    public function getName(): ?string
    {
        return $this->name;
    }
    public function setName(?string $name): self
    {
        $this->name = $name;
        return $this;
    }
    public function getPath(): ?string
    {
        return $this->path;
    }
    public function setPath(?string $path): self
    {
        $this->path = $path;
        return $this;
    }
    public function getType(): ?string
    {
        return $this->type;
    }
    public function setType(?string $type): self
    {
        $this->type = $type;
        return $this;
    }
    public function getRecette(): ?RecetteDFM
    {
        return $this->recette;
    }
    public function setRecette($recette): self
    {
        $this->recette = $recette;
        return $this;
    }
    /**
     * Get the value of file
     */
    public function getFile()
    {
        return $this->file;
    }
    /**
     * Set the value of file
     *
     * @return  self
     */
    public function setFile(?File $file = null)
    {
        $this->file = $file;
        return $this;
    }
}
