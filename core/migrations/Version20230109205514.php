<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230109205514 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE recette_dfm ADD creator_id INT NOT NULL');
        $this->addSql('ALTER TABLE recette_dfm ADD CONSTRAINT FK_2B0684A61220EA6 FOREIGN KEY (creator_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_2B0684A61220EA6 ON recette_dfm (creator_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE recette_dfm DROP FOREIGN KEY FK_2B0684A61220EA6');
        $this->addSql('DROP INDEX IDX_2B0684A61220EA6 ON recette_dfm');
        $this->addSql('ALTER TABLE recette_dfm DROP creator_id');
    }
}
