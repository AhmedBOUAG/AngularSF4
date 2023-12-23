<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231223162959 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE ext_log_entries (id INT AUTO_INCREMENT NOT NULL, action VARCHAR(8) NOT NULL, logged_at DATETIME NOT NULL, object_id VARCHAR(64) DEFAULT NULL, object_class VARCHAR(191) NOT NULL, version INT NOT NULL, data LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\', username VARCHAR(191) DEFAULT NULL, INDEX log_class_lookup_idx (object_class), INDEX log_date_lookup_idx (logged_at), INDEX log_user_lookup_idx (username), INDEX log_version_lookup_idx (object_id, object_class, version), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB ROW_FORMAT = DYNAMIC');
        $this->addSql('CREATE TABLE image (id CHAR(36) NOT NULL COMMENT \'(DC2Type:uuid)\', recette_id CHAR(36) DEFAULT NULL COMMENT \'(DC2Type:uuid)\', name VARCHAR(255) NOT NULL, path VARCHAR(255) DEFAULT NULL, type VARCHAR(25) NOT NULL, INDEX IDX_C53D045F89312FE9 (recette_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE locality (id CHAR(36) NOT NULL COMMENT \'(DC2Type:uuid)\', code_commune VARCHAR(10) NOT NULL, nom_commune VARCHAR(255) NOT NULL, code_postal VARCHAR(15) NOT NULL, libelle VARCHAR(255) NOT NULL, coordonnees_geo VARCHAR(30) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE message (id CHAR(36) NOT NULL COMMENT \'(DC2Type:uuid)\', user_id CHAR(36) NOT NULL COMMENT \'(DC2Type:uuid)\', parent_id CHAR(36) DEFAULT NULL COMMENT \'(DC2Type:uuid)\', INDEX IDX_B6BD307FA76ED395 (user_id), INDEX IDX_B6BD307F727ACA70 (parent_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE recette_dfm (id CHAR(36) NOT NULL COMMENT \'(DC2Type:uuid)\', creator_id CHAR(36) NOT NULL COMMENT \'(DC2Type:uuid)\', locality_id CHAR(36) DEFAULT NULL COMMENT \'(DC2Type:uuid)\', title VARCHAR(255) NOT NULL, subtitle VARCHAR(255) NOT NULL, category INT NOT NULL, price DOUBLE PRECISION NOT NULL, description LONGTEXT NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, status VARCHAR(255) DEFAULT \'draft\' NOT NULL, INDEX IDX_2B0684A61220EA6 (creator_id), INDEX IDX_2B0684A88823A92 (locality_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id CHAR(36) NOT NULL COMMENT \'(DC2Type:uuid)\', firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, username VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, roles JSON NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, birthdate DATE NOT NULL, created_at DATETIME DEFAULT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_recette_dfm (user_id CHAR(36) NOT NULL COMMENT \'(DC2Type:uuid)\', recette_dfm_id CHAR(36) NOT NULL COMMENT \'(DC2Type:uuid)\', INDEX IDX_ABABA1DFA76ED395 (user_id), INDEX IDX_ABABA1DF7D099F07 (recette_dfm_id), PRIMARY KEY(user_id, recette_dfm_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE image ADD CONSTRAINT FK_C53D045F89312FE9 FOREIGN KEY (recette_id) REFERENCES recette_dfm (id)');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307FA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307F727ACA70 FOREIGN KEY (parent_id) REFERENCES message (id)');
        $this->addSql('ALTER TABLE recette_dfm ADD CONSTRAINT FK_2B0684A61220EA6 FOREIGN KEY (creator_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE recette_dfm ADD CONSTRAINT FK_2B0684A88823A92 FOREIGN KEY (locality_id) REFERENCES locality (id)');
        $this->addSql('ALTER TABLE user_recette_dfm ADD CONSTRAINT FK_ABABA1DFA76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_recette_dfm ADD CONSTRAINT FK_ABABA1DF7D099F07 FOREIGN KEY (recette_dfm_id) REFERENCES recette_dfm (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE image DROP FOREIGN KEY FK_C53D045F89312FE9');
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307FA76ED395');
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307F727ACA70');
        $this->addSql('ALTER TABLE recette_dfm DROP FOREIGN KEY FK_2B0684A61220EA6');
        $this->addSql('ALTER TABLE recette_dfm DROP FOREIGN KEY FK_2B0684A88823A92');
        $this->addSql('ALTER TABLE user_recette_dfm DROP FOREIGN KEY FK_ABABA1DFA76ED395');
        $this->addSql('ALTER TABLE user_recette_dfm DROP FOREIGN KEY FK_ABABA1DF7D099F07');
        $this->addSql('DROP TABLE ext_log_entries');
        $this->addSql('DROP TABLE image');
        $this->addSql('DROP TABLE locality');
        $this->addSql('DROP TABLE message');
        $this->addSql('DROP TABLE recette_dfm');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE user_recette_dfm');
    }
}
