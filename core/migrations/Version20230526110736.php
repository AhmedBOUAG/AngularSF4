<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230526110736 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE recette_dfm ADD locality_id INT DEFAULT NULL, DROP city, DROP zip');
        $this->addSql('ALTER TABLE recette_dfm ADD CONSTRAINT FK_2B0684A88823A92 FOREIGN KEY (locality_id) REFERENCES locality (id)');
        $this->addSql('CREATE INDEX IDX_2B0684A88823A92 ON recette_dfm (locality_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE recette_dfm DROP FOREIGN KEY FK_2B0684A88823A92');
        $this->addSql('DROP INDEX IDX_2B0684A88823A92 ON recette_dfm');
        $this->addSql('ALTER TABLE recette_dfm ADD city VARCHAR(255) NOT NULL, ADD zip VARCHAR(255) NOT NULL, DROP locality_id');
    }
}
