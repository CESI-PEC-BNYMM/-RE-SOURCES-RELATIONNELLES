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
  `num_tel` VARCHAR(10) NULL,
  `num_sec` VARCHAR(13) NULL,
  `role` VARCHAR(45) NULL,
  `date_naissance` DATE NULL,
  `sexe` CHAR(1) NULL,
  `actif` TINYINT(1) NULL DEFAULT 1,
  `validaton` TINYINT(1) NULL DEFAULT 1,
  `code_postal` VARCHAR(5) NULL,
  `ville` VARCHAR(45) NULL,
  `mdp` VARCHAR(512) NULL,
  `date_derniere_connexion` DATETIME NULL,
  PRIMARY KEY (`idCitoyen`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ressources_relationnelles`.`Publication`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ressources_relationnelles`.`Publication` ;

CREATE TABLE IF NOT EXISTS `ressources_relationnelles`.`Publication` (
  `idPublication` INT NOT NULL AUTO_INCREMENT,
  `description` LONGTEXT NULL,
  `date_pub` DATETIME NULL,
  `pub_validee` TINYINT(1) NULL DEFAULT 0,
  `pub_signalee` TINYINT(1) NULL DEFAULT 0,
  `nbr_vues` INT NULL,
  `Citoyen_idCitoyen` INT NOT NULL,
  PRIMARY KEY (`idPublication`),
  INDEX `fk_Publication_Citoyen_idx` (`Citoyen_idCitoyen` ASC) VISIBLE,
  CONSTRAINT `fk_Publication_Citoyen`
    FOREIGN KEY (`Citoyen_idCitoyen`)
    REFERENCES `ressources_relationnelles`.`Citoyen` (`idCitoyen`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ressources_relationnelles`.`Catégorie`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ressources_relationnelles`.`Catégorie` ;

CREATE TABLE IF NOT EXISTS `ressources_relationnelles`.`Catégorie` (
  `idCatégorie` INT NOT NULL AUTO_INCREMENT,
  `libelle` VARCHAR(45) NULL,
  `actif` TINYINT(1) NULL DEFAULT 1,
  PRIMARY KEY (`idCatégorie`))
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
  `Publication_idPublication` INT NOT NULL,
  PRIMARY KEY (`idRessource`),
  INDEX `fk_Ressource_Publication1_idx` (`Publication_idPublication` ASC) VISIBLE,
  CONSTRAINT `fk_Ressource_Publication1`
    FOREIGN KEY (`Publication_idPublication`)
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
  `nom_createur` VARCHAR(45) NULL,
  `prenom_createur` VARCHAR(45) NULL,
  `mail_createur` VARCHAR(45) NULL,
  `Citoyen_idCitoyen` INT NOT NULL,
  PRIMARY KEY (`idticket`),
  INDEX `fk_ticket_Citoyen1_idx` (`Citoyen_idCitoyen` ASC) VISIBLE,
  CONSTRAINT `fk_ticket_Citoyen1`
    FOREIGN KEY (`Citoyen_idCitoyen`)
    REFERENCES `ressources_relationnelles`.`Citoyen` (`idCitoyen`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ressources_relationnelles`.`commentaire`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ressources_relationnelles`.`commentaire` ;

CREATE TABLE IF NOT EXISTS `ressources_relationnelles`.`commentaire` (
  `idCommentaire` VARCHAR(45) NOT NULL,
  `Citoyen_idCitoyen` INT NULL,
  `Publication_idPublication` INT NOT NULL,
  `text_commentaire` LONGTEXT NULL,
  `commentaire_signale` TINYINT(1) NULL DEFAULT 0,
  `type` TINYINT(1) NULL,
  INDEX `fk_Citoyen_has_Publication_Publication1_idx` (`Publication_idPublication` ASC) VISIBLE,
  INDEX `fk_Citoyen_has_Publication_Citoyen1_idx` (`Citoyen_idCitoyen` ASC) VISIBLE,
  PRIMARY KEY (`idCommentaire`),
  CONSTRAINT `fk_Citoyen_has_Publication_Citoyen1`
    FOREIGN KEY (`Citoyen_idCitoyen`)
    REFERENCES `ressources_relationnelles`.`Citoyen` (`idCitoyen`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Citoyen_has_Publication_Publication1`
    FOREIGN KEY (`Publication_idPublication`)
    REFERENCES `ressources_relationnelles`.`Publication` (`idPublication`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ressources_relationnelles`.`demande_ami`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ressources_relationnelles`.`demande_ami` ;

CREATE TABLE IF NOT EXISTS `ressources_relationnelles`.`demande_ami` (
  `Citoyen_idCitoyen` INT NOT NULL,
  `Citoyen_idCitoyen1` INT NOT NULL,
  `demande_validee` TINYINT(1) NULL DEFAULT 0,
  PRIMARY KEY (`Citoyen_idCitoyen`, `Citoyen_idCitoyen1`),
  INDEX `fk_Citoyen_has_Citoyen1_Citoyen2_idx` (`Citoyen_idCitoyen1` ASC) VISIBLE,
  INDEX `fk_Citoyen_has_Citoyen1_Citoyen1_idx` (`Citoyen_idCitoyen` ASC) VISIBLE,
  CONSTRAINT `fk_Citoyen_has_Citoyen1_Citoyen1`
    FOREIGN KEY (`Citoyen_idCitoyen`)
    REFERENCES `ressources_relationnelles`.`Citoyen` (`idCitoyen`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Citoyen_has_Citoyen1_Citoyen2`
    FOREIGN KEY (`Citoyen_idCitoyen1`)
    REFERENCES `ressources_relationnelles`.`Citoyen` (`idCitoyen`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ressources_relationnelles`.`pub_cat`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ressources_relationnelles`.`pub_cat` ;

CREATE TABLE IF NOT EXISTS `ressources_relationnelles`.`pub_cat` (
  `Publication_idPublication` INT NOT NULL,
  `Catégorie_idCatégorie` INT NOT NULL,
  PRIMARY KEY (`Publication_idPublication`, `Catégorie_idCatégorie`),
  INDEX `fk_Publication_has_Catégorie_Catégorie1_idx` (`Catégorie_idCatégorie` ASC) VISIBLE,
  INDEX `fk_Publication_has_Catégorie_Publication1_idx` (`Publication_idPublication` ASC) VISIBLE,
  CONSTRAINT `fk_Publication_has_Catégorie_Publication1`
    FOREIGN KEY (`Publication_idPublication`)
    REFERENCES `ressources_relationnelles`.`Publication` (`idPublication`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Publication_has_Catégorie_Catégorie1`
    FOREIGN KEY (`Catégorie_idCatégorie`)
    REFERENCES `ressources_relationnelles`.`Catégorie` (`idCatégorie`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ressources_relationnelles`.`Choix_sondage_citoyen`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ressources_relationnelles`.`Choix_sondage_citoyen` ;

CREATE TABLE IF NOT EXISTS `ressources_relationnelles`.`Choix_sondage_citoyen` (
  `Citoyen_idCitoyen` INT NOT NULL,
  `Ressource_idRessource` INT NOT NULL,
  `choix_sondage_citoyen` VARCHAR(45) NULL,
  INDEX `fk_table1_Citoyen1_idx` (`Citoyen_idCitoyen` ASC) VISIBLE,
  INDEX `fk_table1_Ressource1_idx` (`Ressource_idRessource` ASC) VISIBLE,
  CONSTRAINT `fk_table1_Citoyen1`
    FOREIGN KEY (`Citoyen_idCitoyen`)
    REFERENCES `ressources_relationnelles`.`Citoyen` (`idCitoyen`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_table1_Ressource1`
    FOREIGN KEY (`Ressource_idRessource`)
    REFERENCES `ressources_relationnelles`.`Ressource` (`idRessource`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
