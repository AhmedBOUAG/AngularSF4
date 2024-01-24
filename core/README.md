## Installation du projet:

Dans un premier temps, lancer ces commandes une fois que le projet est récupéré (git clone) et que les environnements sont prêts :

```bash
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate --no-interaction
php bin/console app:generate-locality
```

Lancer les fixtures avec la commande :

```bash
php bin/console doctrine:fixtures:load --no-interaction --purge-exclusions=locality
```

Pour se connecter à l'application, il faut récupérer l'adresse email d'un des utilisateurs de la table 'user'.
Le mot de passe pour les utilisateurs chargés depuis les fixtures est : "test"
