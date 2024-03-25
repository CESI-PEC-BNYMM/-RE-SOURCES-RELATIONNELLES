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



-- -----------------------------------------------------
-- Table `ressources_relationnelles`.`Categorie`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ressources_relationnelles`.`Categorie` ;

CREATE TABLE IF NOT EXISTS `ressources_relationnelles`.`Categorie` (
  `idCategorie` INT NOT NULL AUTO_INCREMENT,
  `libelle` VARCHAR(45) NULL,
  `actif` TINYINT(1) NULL DEFAULT 1,
  PRIMARY KEY (`idCategorie`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ressources_relationnelles`.`Ressource`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ressources_relationnelles`.`Ressource` ;

CREATE TABLE IF NOT EXISTS `ressources_relationnelles`.`Ressource` (
  `idRessource` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NULL,
  `lien` VARCHAR(255) NULL,
  `extension` VARCHAR(45) NULL,
  `idPublication` INT NOT NULL,
  PRIMARY KEY (`idRessource`),
  INDEX `fk_Ressource_Publication1_idx` (`idPublication` ASC) ,
  CONSTRAINT `fk_Ressource_Publication1`
    FOREIGN KEY (`idPublication`)
    REFERENCES `ressources_relationnelles`.`Publication` (`idPublication`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ressources_relationnelles`.`Ticket`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ressources_relationnelles`.`Ticket` ;

CREATE TABLE IF NOT EXISTS `ressources_relationnelles`.`Ticket` (
  `idticket` INT NOT NULL AUTO_INCREMENT,
  `objet` VARCHAR(45) NULL,
  `description` LONGTEXT NULL,
  `etat` TINYINT(1) NULL DEFAULT 0,
  `nomCreateur` VARCHAR(45) NULL,
  `prenomCreateur` VARCHAR(45) NULL,
  `mailCreateur` VARCHAR(45) NULL,
  `idCitoyen` INT NOT NULL,
  PRIMARY KEY (`idticket`),
  INDEX `fk_ticket_Citoyen1_idx` (`idCitoyen` ASC) ,
  CONSTRAINT `fk_ticket_Citoyen1`
    FOREIGN KEY (`idCitoyen`)
    REFERENCES `ressources_relationnelles`.`Citoyen` (`idCitoyen`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ressources_relationnelles`.`Commentaire`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ressources_relationnelles`.`Commentaire` ;

CREATE TABLE IF NOT EXISTS `ressources_relationnelles`.`Commentaire` (
  `idCommentaire` VARCHAR(45) NOT NULL,
  `idCitoyen` INT NULL,
  `idPublication` INT NOT NULL,
  `textCommentaire` LONGTEXT NULL,
  `commentaireSignale` TINYINT(1) NULL DEFAULT 0,
  `type` TINYINT(1) NULL,
  INDEX `fk_Citoyen_has_Publication_Publication1_idx` (`idPublication` ASC) ,
  INDEX `fk_Citoyen_has_Publication_Citoyen1_idx` (`idCitoyen` ASC) ,
  PRIMARY KEY (`idCommentaire`),
  CONSTRAINT `fk_Citoyen_has_Publication_Citoyen1`
    FOREIGN KEY (`idCitoyen`)
    REFERENCES `ressources_relationnelles`.`Citoyen` (`idCitoyen`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Citoyen_has_Publication_Publication1`
    FOREIGN KEY (`idPublication`)
    REFERENCES `ressources_relationnelles`.`Publication` (`idPublication`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ressources_relationnelles`.`DemandeAmi`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ressources_relationnelles`.`DemandeAmi` ;

CREATE TABLE IF NOT EXISTS `ressources_relationnelles`.`DemandeAmi` (
  `idCitoyen` INT NOT NULL,
  `idCitoyen1` INT NOT NULL,
  `demandeValidee` TINYINT(1) NULL DEFAULT 0,
  PRIMARY KEY (`idCitoyen`, `idCitoyen1`),
  INDEX `fk_Citoyen_has_Citoyen1_Citoyen2_idx` (`idCitoyen1` ASC) ,
  INDEX `fk_Citoyen_has_Citoyen1_Citoyen1_idx` (`idCitoyen` ASC) ,
  CONSTRAINT `fk_Citoyen_has_Citoyen1_Citoyen1`
    FOREIGN KEY (`idCitoyen`)
    REFERENCES `ressources_relationnelles`.`Citoyen` (`idCitoyen`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Citoyen_has_Citoyen1_Citoyen2`
    FOREIGN KEY (`idCitoyen1`)
    REFERENCES `ressources_relationnelles`.`Citoyen` (`idCitoyen`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ressources_relationnelles`.`PubliCat`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ressources_relationnelles`.`PubliCat` ;

CREATE TABLE IF NOT EXISTS `ressources_relationnelles`.`PubliCat` (
  `idPublication` INT NOT NULL,
  `idCategorie` INT NOT NULL,
  PRIMARY KEY (`idPublication`, `idCategorie`),
  INDEX `fk_Publication_has_Categorie_Categorie1_idx` (`idCategorie` ASC) ,
  INDEX `fk_Publication_has_Categorie_Publication1_idx` (`idPublication` ASC) ,
  CONSTRAINT `fk_Publication_has_Categorie_Publication1`
    FOREIGN KEY (`idPublication`)
    REFERENCES `ressources_relationnelles`.`Publication` (`idPublication`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Publication_has_Categorie_Categorie1`
    FOREIGN KEY (`idCategorie`)
    REFERENCES `ressources_relationnelles`.`Categorie` (`idCategorie`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ressources_relationnelles`.`ChoixSondageCitoyen`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ressources_relationnelles`.`ChoixSondageCitoyen` ;

CREATE TABLE IF NOT EXISTS `ressources_relationnelles`.`ChoixSondageCitoyen` (
  `idCitoyen` INT NOT NULL,
  `idRessource` INT NOT NULL,
  `choixSondageCitoyen` VARCHAR(45) NULL,
  INDEX `fk_table1_Citoyen1_idx` (`idCitoyen` ASC) ,
  INDEX `fk_table1_Ressource1_idx` (`idRessource` ASC) ,
  CONSTRAINT `fk_table1_Citoyen1`
    FOREIGN KEY (`idCitoyen`)
    REFERENCES `ressources_relationnelles`.`Citoyen` (`idCitoyen`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_table1_Ressource1`
    FOREIGN KEY (`idRessource`)
    REFERENCES `ressources_relationnelles`.`Ressource` (`idRessource`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
