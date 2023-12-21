## Installation du projet:

Dans un premier temps, lancer ces commande une fois que le projet récupéré et les environnements sont prêt:
```bash
php bin/console d:d:c
php bin/console d:m:m --no-interaction
php bin/console app:generate-locality
```

Afin de faire fonctionner les fixtures, il faut commenter/désactiver la ligne:

`PHP`
```php
// src/EventListener/RecipeListener.php
$entity->setCreator(creator: $this->security->getUser());
```
```bash
php bin/console doctrine:fixtures:load --append
```

Une fois les fixtures chargées, il faut décommenter/réactiver la ligne:

`PHP`
```php
// src/EventListener/RecipeListener.php
$entity->setCreator(creator: $this->security->getUser());
```


Pour se connecter à l'application, il faut récupérer l'adresse email d'un des utilisateurs de la table 'user'.
Le mot de passe pour les utilisateurs chargées depuis les fixtures est: "test"
