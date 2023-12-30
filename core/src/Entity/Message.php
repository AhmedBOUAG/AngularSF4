<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\MessageRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Traits\ResourceIdTrait;
use App\Traits\TimestampableTrait;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: MessageRepository::class)]
#[ApiResource(
    types: ['https://schema.org/Message'],
    operations: [
        new Get(),
        new Post(),
        new Delete(),
        new Post(),
        new Put(
            requirements: ['id' => '[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}'],
        ),
        new Get(
            requirements: ['id' => '[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}'],
        ),
        new GetCollection(
            name: self::API_NAME_SENDERED_MESSAGES,
            normalizationContext: ['groups' => ['message:read']],
            uriTemplate: 'messages/my-sendered-messages',
            security: "is_granted('ROLE_USER')",
            openapiContext: [
                'summary' => 'Get my sendered messages',
            ],
        ),
    ],
    normalizationContext: ['groups' => ['message:read']],
    denormalizationContext: ['groups' => ['message:write']]
)]
#[UniqueEntity(fields: 'id', message: 'This message already exists')]
class Message
{
    use ResourceIdTrait;
    use TimestampableTrait;

    const API_NAME_SENDERED_MESSAGES = '_api_my_sendered_messages_get_collection';

    #[ORM\ManyToOne(targetEntity: self::class, inversedBy: 'messages')]
    #[Groups(['message:read', 'message:write'])]
    private ?self $parent = null;

    #[ORM\OneToMany(mappedBy: 'parent', targetEntity: self::class)]
    #[Groups(['message:read'])]
    #[Assert\NotBlank]
    private Collection $messages;

    #[ORM\ManyToOne(inversedBy: 'sentMessages', targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Assert\NotBlank]
    #[Groups(['message:read', 'message:write'])]
    private User $sender;

    #[ORM\ManyToOne(inversedBy: 'recievedMessages', targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Assert\NotBlank]
    #[Groups(['message:read', 'message:write'])]
    private User $recipient;

    #[ORM\ManyToOne(inversedBy: 'messages', targetEntity: RecetteDFM::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Assert\NotBlank]
    #[Groups(['message:read', 'message:write'])]
    private RecetteDFM $relatedRecipe;

    #[ORM\Column(type: 'boolean', options: ['default' => false])]
    #[Groups(['message:read', 'message:write'])]
    private bool $readed = false;

    #[ORM\Column(type: 'text', nullable: true)]
    #[Assert\NotBlank]
    #[Groups(['message:read', 'message:write'])]
    private ?string $content = null;

    public function __construct()
    {
        $this->messages = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable();
    }

    public function getParent(): ?self
    {
        return $this->parent;
    }

    public function setParent(?self $parent): self
    {
        $this->parent = $parent;

        return $this;
    }

    /**
     * @return Collection<int, self>
     */
    public function getMessages(): Collection
    {
        return $this->messages;
    }

    public function addMessage(self $message): self
    {
        if (!$this->messages->contains($message)) {
            $this->messages->add($message);
            $message->setParent($this);
        }

        return $this;
    }

    public function removeMessage(self $message): self
    {
        if ($this->messages->removeElement($message)) {
            // set the owning side to null (unless already changed)
            if ($message->getParent() === $this) {
                $message->setParent(null);
            }
        }

        return $this;
    }

    public function getSender(): User
    {
        return $this->sender;
    }

    public function setSender(User $sender): static
    {
        $this->sender = $sender;

        return $this;
    }

    public function getRecipient(): User
    {
        return $this->recipient;
    }

    public function setRecipient(User $recipient): static
    {
        $this->recipient = $recipient;

        return $this;
    }

    public function getRelatedRecipe(): RecetteDFM
    {
        return $this->relatedRecipe;
    }

    public function setRelatedRecipe(RecetteDFM $relatedRecipe): static
    {
        $this->relatedRecipe = $relatedRecipe;

        return $this;
    }

    public function isReaded(): bool
    {
        return $this->readed;
    }

    public function setReaded(bool $readed): static
    {
        $this->readed = $readed;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(?string $content): static
    {
        $this->content = $content;

        return $this;
    }
}
