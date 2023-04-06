<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230327213234 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX recipe_creator_index ON recette_dfm');
        $this->addSql('ALTER TABLE recette_dfm ADD state VARCHAR(255) DEFAULT \'draft\' NOT NULL, CHANGE description description LONGTEXT NOT NULL');
        $this->addSql("UPDATE recette_dfm SET state='published'");
        $this->addSql('ALTER TABLE user CHANGE created_at created_at DATETIME DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user CHANGE created_at created_at DATETIME NOT NULL');
        $this->addSql('ALTER TABLE recette_dfm DROP state, CHANGE description description LONGTEXT DEFAULT NULL');
        $this->addSql('CREATE INDEX recipe_creator_index ON recette_dfm (creator_id)');
    }
}
