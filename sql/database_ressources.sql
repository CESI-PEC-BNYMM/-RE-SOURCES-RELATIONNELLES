-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ressources_relationnelles
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `ressources_relationnelles` ;

-- -----------------------------------------------------
-- Schema ressources_relationnelles
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ressources_relationnelles` DEFAULT CHARACTER SET utf8 ;
USE `ressources_relationnelles` ;

-- -----------------------------------------------------
-- Table `ressources_relationnelles`.`Citoyen`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ressources_relationnelles`.`Citoyen` ;

CREATE TABLE IF NOT EXISTS `ressources_relationnelles`.`Citoyen` (
  `idCitoyen` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(45) NULL,
  `prenom` VARCHAR(45) NULL,
  `mail` VARCHAR(45) NULL,
  `numTel` VARCHAR(10) NULL,
  `numSec` VARCHAR(13) NULL,
  `role` VARCHAR(45) NULL,
  `dateNaissance` DATE NULL,
  `sexe` CHAR(1) NULL,
  `actif` TINYINT(1) NULL DEFAULT 1,
  `validaton` TINYINT(1) NULL DEFAULT 1,
  `codePostal` VARCHAR(5) NULL,
  `ville` VARCHAR(45) NULL,
  `mdp` VARCHAR(512) NULL,
  `dateDerniereConnexion` DATETIME NULL,
  PRIMARY KEY (`idCitoyen`))
ENGINE = InnoDB;

-- Insérer des données dans la table Citoyen
INSERT INTO `ressources_relationnelles`.`Citoyen`
(`nom`, `prenom`, `mail`, `numTel`, `numSec`, `role`, `dateNaissance`, `sexe`, `codePostal`, `ville`, `mdp`, `dateDerniereConnexion`)
VALUES
('Dupont', 'Jean', 'jean.dupont@example.com', '0612345678', '1234567890123', 'citoyen', '1990-01-01', 'M', '75000', 'Paris', '$2a$10$dGq2TzQ9rB.RQzZo4FZKeOwYzG6bCXzT2/qrJ5.jc5sMp/TjL7CGC', '2022-01-01 12:00:00'),
('Martin', 'Pierre', 'pierre.martin@example.com', '0698765432', '9876543210987', 'citoyen', '1985-05-15', 'M', '69000', 'Lyon', '$2a$10$Z.bMnHrXzGi8DpZgRqLJme3kjN/4YcUdMZpN5yL.jJDqv7Qi2gJq6', '2022-02-01 10:30:00'),
('Durand', 'Marie', 'marie.durand@example.com', '0789456123', '4561237890126', 'citoyen', '1992-11-22', 'F', '33000', 'Bordeaux', '$2a$10$oU/x1bYeTKHX5f5qBxXvGeG.DlP2vSJ1QrkdgR9V4vqrTg6IwX6ZK', '2022-03-01 09:45:00');

-- -----------------------------------------------------
-- Table `ressources_relationnelles`.`Publication`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ressources_relationnelles`.`Publication` ;

CREATE TABLE IF NOT EXISTS `ressources_relationnelles`.`Publication` (
  `idPublication` INT NOT NULL AUTO_INCREMENT,
  `description` LONGTEXT NULL,
  `datePub` DATETIME NULL,
  `pubValidee` TINYINT(1) NULL DEFAULT 0,
  `pubSignalee` TINYINT(1) NULL DEFAULT 0,
  `nbrVues` INT NULL,
  `idCitoyen` INT NOT NULL,
  PRIMARY KEY (`idPublication`),
  INDEX `fk_Publication_Citoyen_idx` (`idCitoyen` ASC) ,
  CONSTRAINT `fk_Publication_Citoyen` FOREIGN KEY (`idCitoyen`)
    REFERENCES `Citoyen` (`idCitoyen`) ON DELETE NO ACTION ON UPDATE NO ACTION
)
ENGINE = InnoDB;

-- Insérer des données dans la table Publication
INSERT INTO `ressources_relationnelles`.`Publication`
(`description`, `datePub`, `idCitoyen`)
VALUES
('Ma première publication', '2022-01-01 12:00:00', 1),
('Une nouvelle publication', '2022-02-01 10:30:00', 2),
('Publi
ication intéressante', '2022-03-01 09:45:00', 3);

-- Table ressources_relationnelles.Categorie

DROP TABLE IF EXISTS ressources_relationnelles.Categorie ;

CREATE TABLE IF NOT EXISTS ressources_relationnelles.Categorie (
idCategorie INT NOT NULL AUTO_INCREMENT,
libelle VARCHAR(45) NULL,
actif TINYINT(1) NULL DEFAULT 1,
PRIMARY KEY (idCategorie))
ENGINE = InnoDB;

-- Insérer des données dans la table Categorie
INSERT INTO ressources_relationnelles.Categorie
(libelle)
VALUES
('Sport'),
('Culture'),
('Environnement');

-- Table ressources_relationnelles.Ressource

DROP TABLE IF EXISTS ressources_relationnelles.Ressource ;

CREATE TABLE IF NOT EXISTS ressources_relationnelles.Ressource (
idRessource INT NOT NULL AUTO_INCREMENT,
type VARCHAR(45) NULL,
lien VARCHAR(255) NULL,
extension VARCHAR(45) NULL,
idPublication INT NOT NULL,
PRIMARY KEY (idRessource),
INDEX fk_Ressource_Publication1_idx (idPublication ASC) ,
CONSTRAINT fk_Ressource_Publication1
FOREIGN KEY (idPublication)
REFERENCES ressources_relationnelles.Publication (idPublication)
ON DELETE NO ACTION
ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- Insérer des données dans la table Ressource
INSERT INTO ressources_relationnelles.Ressource
(type, lien, extension, idPublication)
VALUES
('image', 'https://example.com/image.jpg', 'jpg', 1),
('video', 'https://example.com/video.mp4', 'mp4', 2),
('document', 'https://example.com/document.pdf', 'pdf', 3);

-- Table ressources_relationnelles.Ticket

DROP TABLE IF EXISTS ressources_relationnelles.Ticket ;

CREATE TABLE IF NOT EXISTS ressources_relationnelles.Ticket (
idticket INT NOT NULL AUTO_INCREMENT,
objet VARCHAR(45) NULL,
description LONGTEXT NULL,
etat TINYINT(1) NULL DEFAULT 0,
nomCreateur VARCHAR(45) NULL,
prenomCreateur VARCHAR(45) NULL,
mailCreateur VARCHAR(45) NULL,
idCitoyen INT NOT NULL,
PRIMARY KEY (idticket),
INDEX fk_ticket_Citoyen1_idx (idCitoyen ASC) ,
CONSTRAINT fk_ticket_Citoyen1
FOREIGN KEY (idCitoyen)
REFERENCES ressources_relationnelles.Citoyen (idCitoyen)
ON DELETE NO ACTION
ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- Insérer des données dans la table Ticket
INSERT INTO ressources_relationnelles.Ticket
(objet, description, nomCreateur, prenomCreateur, mailCreateur, idCitoyen)
VALUES
('Problème de connexion', 'Je n''arrive pas à me connecter à mon compte.', 'Dupont', 'Jean', 'jean.dupont@example.com', 1),
('Erreur 404', 'Je rencontre une erreur 404 sur certaines pages.', 'Martin', 'Pierre', 'pierre.martin@example.com', 2),
('Problème de formulaire', 'Le formulaire ne fonctionne pas correctement.', 'Durand', 'Marie', 'marie.durand@example.com', 3);

-- Table ressources_relationnelles.Commentaire

DROP TABLE IF EXISTS ressources_relationnelles.Commentaire ;

CREATE TABLE IF NOT EXISTS ressources_relationnelles.Commentaire (
idCommentaire VARCHAR(45) NOT NULL,
idCitoyen INT NULL,
idPublication INT NOT NULL,
textCommentaire LONGTEXT NULL,
commentaireSignale TINYINT(1) NULL DEFAULT 0,
type TINYINT(1) NULL,
INDEX fk_Citoyen_has_Publication_Publication1_idx (idPublication ASC) ,
INDEX fk_Citoyen_has_Publication_Citoyen1_idx (idCitoyen ASC) ,
PRIMARY KEY (idCommentaire),
CONSTRAINT fk_Citoyen_has_Publication_Citoyen1
FOREIGN KEY (idCitoyen)
REFERENCES ressources_relationnelles.Citoyen (idCitoyen)
ON DELETE NO ACTION
ON UPDATE NO ACTION,
CONSTRAINT fk_Citoyen_has_Publication_Publication1
FOREIGN KEY (idPublication)
REFERENCES ressources_relationnelles.Publication (idPublication)
ON DELETE NO ACTION
ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- Insérer des données dans la table Commentaire
INSERT INTO ressources_relationnelles.Commentaire
(idCommentaire, idCitoyen, idPublication, textCommentaire, type)
VALUES
('1', 1, 1, 'Super publication !', 0),
('2', 2, 2, 'Très intéressant !', 0),
('3', 3, 3, 'Merci pour le partage !', 0);

-- Table ressources_relationnelles.DemandeAmi

DROP TABLE IF EXISTS ressources_relationnelles.DemandeAmi ;

CREATE TABLE IF NOT EXISTS ressources_relationnelles.DemandeAmi (
idCitoyen INT NOT NULL,
idCitoyen1 INT NOT NULL,
demandeValidee TINYINT(1) NULL DEFAULT 0,
PRIMARY KEY (idCitoyen, idCitoyen1),
INDEX fk_Citoyen_has_Citoyen1_Citoyen2_idx (idCitoyen1 ASC) ,
INDEX fk_Citoyen_has_Citoyen1_Citoyen1_idx (idCitoyen ASC) ,
CONSTRAINT fk_Citoyen_has_Citoyen1_Citoyen1
FOREIGN KEY (idCitoyen)
REFERENCES ressources_relationnelles.Citoyen (idCitoyen)
ON DELETE NO ACTION
ON UPDATE NO ACTION,
CONSTRAINT fk_Citoyen_has_Citoyen1_Citoyen2
FOREIGN KEY (idCitoyen1)
REFERENCES ressources_relationnelles.Citoyen (idCitoyen)
ON DELETE NO ACTION
ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- Insérer des données dans la table DemandeAmi
INSERT INTO ressources_relationnelles.DemandeAmi
(idCitoyen, idCitoyen1, demandeValidee)
VALUES
(1, 2, 0),
(1, 3, 0),
(2, 3, 0);

-- Table ressources_relationnelles.PubliCat

DROP TABLE IF EXISTS ressources_relationnelles.PubliCat ;

CREATE TABLE IF NOT EXISTS ressources_relationnelles.PubliCat (
idPublication INT NOT NULL,
idCategorie INT NOT NULL,
PRIMARY KEY (idPublication, idCategorie),
INDEX fk_Publication_has_Categorie_Categorie1_idx (idCategorie ASC) ,
INDEX fk_Publication_has_Categorie_Publication1_idx (idPublication ASC) ,
CONSTRAINT fk_Publication_has_Categorie_Publication1
FOREIGN KEY (idPublication)
REFERENCES ressources_relationnelles.Publication (idPublication)
ON DELETE NO ACTION
ON UPDATE NO ACTION,
CONSTRAINT fk_Publication_has_Categorie_Categorie1
FOREIGN KEY (idCategorie)
REFERENCES ressources_relationnelles.Categorie (idCategorie)
ON DELETE NO ACTION
ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- Insérer des données dans la table PubliCat
INSERT INTO ressources_relationnelles.PubliCat
(idPublication, idCategorie)
VALUES
(1, 1),
(2, 2),
(3, 3);

-- Table ressources_relationnelles.ChoixSondageCitoyen

DROP TABLE IF EXISTS ressources_relationnelles.ChoixSondageCitoyen ;

CREATE TABLE IF NOT EXISTS ressources_relationnelles.ChoixSondageCitoyen (
idCitoyen INT NOT NULL,
idRessource INT NOT NULL,
choixSondageCitoyen VARCHAR(45) NULL,
INDEX fk_table1_Citoyen1_idx (idCitoyen ASC) ,
INDEX fk_table1_Ressource1_idx (idRessource ASC) ,
CONSTRAINT fk_table1_Citoyen1
FOREIGN KEY (idCitoyen)
REFERENCES ressources_relationnelles.Citoyen (idCitoyen)
ON DELETE NO ACTION
ON UPDATE NO ACTION,
CONSTRAINT fk_table1_Ressource1
FOREIGN KEY (idRessource)
REFERENCES ressources_relationnelles.Ressource (idRessource)
ON DELETE NO ACTION
ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- Insérer des données dans la table ChoixSondageCitoyen
INSERT INTO ressources_relationnelles.ChoixSondageCitoyen
(idCitoyen, idRessource, choixSondageCitoyen)
VALUES
(1, 1, 'Oui'),
(2, 2, 'Non'),
(3, 3, 'Peut-être');

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;