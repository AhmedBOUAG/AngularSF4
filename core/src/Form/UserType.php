<?php

namespace App\Form;

use Symfony\Component\Form\DataTransformerInterface;
use App\Entity\User;
use Symfony\Component\Form\Extension\Core\Type\BirthdayType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Date;
use Symfony\Component\Validator\Constraints\NotBlank;


class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('firstname')
            ->add('lastname')
            ->add('username')
            ->add('email')
            ->add('roles')
            ->add('password')
            ->add('birthdate', BirthdayType::class, [
                'label' => 'Date de naissance',
                'widget' => 'single_text',
                'html5' => false,
                'attr' => [
                    'class' => 'js-datepicker',
                    'autocomplete' => 'off',
                ],
                'constraints' => [
                    new NotBlank(['message' => 'La date de naissance est obligatoire pour l\'inscription']),
                    new Date(['message' => 'Le format de la date n\'est pas valide.']),
                ],
            ])
            ->add('createdAt');

        $builder->get('birthdate')
            ->addModelTransformer(new class implements DataTransformerInterface
            {
                public function transform($value)
                {
                    if ($value === null) {
                        return null;
                    }

                    // Transformer l'objet DateTime en string pour l'affichage dans le formulaire
                    return $value->format('Y-m-d');
                }

                public function reverseTransform($value)
                {
                    if ($value === null || $value === '') {
                        return null;
                    }

                    // Transformer la valeur string en objet DateTime pour la soumission du formulaire
                    return new \DateTime($value);
                }
            });
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
