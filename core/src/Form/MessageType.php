<?php

declare(strict_types=1);

namespace App\Form;

use App\Entity\Message;
use App\Entity\RecetteDFM;
use App\Entity\User;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\RadioType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MessageType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('readed', RadioType::class, [
                'required' => false,
            ])
            ->add('content', TextType::class, [
                'required' => false,
            ])
            ->add('createdAt', DateTimeType::class, [
                'required' => true,
            ])
            ->add('updatedAt', DateTimeType::class, [
                'required' => false,
            ])
            ->add('parent', EntityType::class, [
                'class' => Message::class,
                'choice_label' => 'id',
                'required' => false,
            ])
            ->add('sender', EntityType::class, [
                'class' => User::class,
                'choice_label' => 'id',
                'required' => true,
            ])
            ->add('recipient', EntityType::class, [
                'class' => User::class,
                'choice_label' => 'id',
                'required' => true,
            ])
            ->add('relatedRecipe', EntityType::class, [
                'class' => RecetteDFM::class,
                'choice_label' => 'id',
                'required' => true,
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Message::class,
        ]);
    }
}
