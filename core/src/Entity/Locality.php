<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\LocalityRepository;
use App\Traits\ResourceIdTrait;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: LocalityRepository::class)]
#[ApiResource(
    types: ['https://schema.org/Locality'],
    normalizationContext: ['groups' => ['locality:read']],
    denormalizationContext: ['groups' => ['locality:write']]
)]
#[ApiFilter(SearchFilter::class, properties: ['libelle' => 'word_start'])]
class Locality
{
    use ResourceIdTrait;

    #[ORM\Column(length: 10)]
    private ?string $codeCommune = null;

    #[ORM\Column(type: 'string', length: 255)]
    private ?string $nomCommune = null;

    #[ORM\Column(type: 'string', length: 15)]
    #[Groups(['recette:read', 'locality:read'])]
    private ?string $codePostal = null;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['recette:read', 'locality:read'])]
    private ?string $libelle = null;

    #[ORM\Column(type: 'string', length: 30)]
    #[Groups(['recette:read', 'locality:read'])]
    private ?string $coordonneesGeo = null;

    #[ORM\OneToMany(mappedBy: 'locality', targetEntity: RecetteDFM::class)]
    private Collection $recetteDFMs;

    public function __construct()
    {
        $this->recetteDFMs = new ArrayCollection();
    }

    public function getCodeCommune(): ?string
    {
        return $this->codeCommune;
    }

    public function setCodeCommune(string $codeCommune): self
    {
        $this->codeCommune = $codeCommune;

        return $this;
    }

    public function getNomCommune(): ?string
    {
        return $this->nomCommune;
    }

    public function setNomCommune(string $nomCommune): self
    {
        $this->nomCommune = $nomCommune;

        return $this;
    }

    public function getCodePostal(): ?string
    {
        return $this->codePostal;
    }

    public function setCodePostal(string $codePostal): self
    {
        $this->codePostal = $codePostal;

        return $this;
    }

    public function getLibelle(): ?string
    {
        return $this->libelle;
    }

    public function setLibelle(string $libelle): self
    {
        $this->libelle = $libelle;

        return $this;
    }

    public function getCoordonneesGeo(): ?string
    {
        return $this->coordonneesGeo;
    }

    public function setCoordonneesGeo(string $coordonneesGeo): self
    {
        $this->coordonneesGeo = $coordonneesGeo;

        return $this;
    }

    /**
     * @return Collection<int, RecetteDFM>
     */
    public function getRecetteDFMs(): Collection
    {
        return $this->recetteDFMs;
    }

    public function addRecetteDFM(RecetteDFM $recetteDFM): self
    {
        if ( ! $this->recetteDFMs->contains($recetteDFM)) {
            $this->recetteDFMs->add($recetteDFM);
            $recetteDFM->setLocality($this);
        }

        return $this;
    }

    public function removeRecetteDFM(RecetteDFM $recetteDFM): self
    {
        if ($this->recetteDFMs->removeElement($recetteDFM)) {
            // set the owning side to null (unless already changed)
            if ($recetteDFM->getLocality() === $this) {
                $recetteDFM->setLocality(null);
            }
        }

        return $this;
    }
}
