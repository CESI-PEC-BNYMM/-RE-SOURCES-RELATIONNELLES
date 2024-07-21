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
  -- Table `ressources_relationnelles`.`citoyen`
  -- -----------------------------------------------------
  CREATE TABLE IF NOT EXISTS `ressources_relationnelles`.`citoyen` (
    `nom` VARCHAR(45) NULL,
    `prenom` VARCHAR(45) NULL,
    `mail` VARCHAR(45) NOT NULL,
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
    PRIMARY KEY (`mail`))
  ENGINE = InnoDB;

  -- Insérer des données dans la table citoyen
  INSERT INTO `ressources_relationnelles`.`citoyen`
  (`nom`, `prenom`, `mail`, `num_tel`, `num_sec`, `role`, `date_naissance`, `sexe`, `code_postal`, `ville`, `mdp`, `date_derniere_connexion`)
  VALUES
  ('Dupont', 'Jean', 'jean.dupont@example.com', '0612345678', '1234567890123', 'citoyen', '1990-01-01', 'M', '75000', 'Paris', '$2a$10$dGq2TzQ9rB.RQzZo4FZKeOwYzG6bCXzT2/qrJ5.jc5sMp/TjL7CGC', '2022-01-01 12:00:00'),
  ('Martin', 'Pierre', 'pierre.martin@example.com', '0698765432', '9876543210987', 'citoyen', '1985-05-15', 'M', '69000', 'Lyon', '$2a$10$Z.bMnHrXzGi8DpZgRqLJme3kjN/4YcUdMZpN5yL.jJDqv7Qi2gJq6', '2022-02-01 10:30:00'),
  ('Durand', 'Marie', 'marie.durand@example.com', '0789456123', '4561237890126', 'citoyen', '1992-11-22', 'F', '33000', 'Bordeaux', '$2a$10$oU/x1bYeTKHX5f5qBxXvGeG.DlP2vSJ1QrkdgR9V4vqrTg6IwX6ZK', '2022-03-01 09:45:00');


  -- -----------------------------------------------------
  -- Table `ressources_relationnelles`.`publication`
  -- -----------------------------------------------------
  CREATE TABLE IF NOT EXISTS `ressources_relationnelles`.`publication` (
    `idpublication` INT NOT NULL AUTO_INCREMENT,
    `description` LONGTEXT NULL,
    `date_pub` DATETIME NULL,
    `pub_validee` TINYINT(1) NULL DEFAULT 0,
    `pub_signalee` TINYINT(1) NULL DEFAULT 0,
    `nbr_vues` INT NULL,
    `citoyen_mail` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`idpublication`),
    INDEX `fk_publication_citoyen1_idx` (`citoyen_mail` ASC) ,
    CONSTRAINT `fk_publication_citoyen1`
      FOREIGN KEY (`citoyen_mail`)
      REFERENCES `ressources_relationnelles`.`citoyen` (`mail`)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION)
  ENGINE = InnoDB;

  -- Insérer des données dans la table publication
  INSERT INTO `ressources_relationnelles`.`publication`
  (`description`, `date_pub`, `citoyen_mail`)
  VALUES
  ('Ma première publication', '2022-01-01 12:00:00', 'jean.dupont@example.com'),
  ('Une nouvelle publication', '2022-02-01 10:30:00', 'pierre.martin@example.com'),
  ('Publication intéressante', '2022-03-01 09:45:00', 'marie.durand@example.com');


  -- -----------------------------------------------------
  -- Table `ressources_relationnelles`.`categorie`
  -- -----------------------------------------------------
  CREATE TABLE IF NOT EXISTS `ressources_relationnelles`.`categorie` (
    `idcategorie` INT NOT NULL AUTO_INCREMENT,
    `libelle` VARCHAR(45) NULL,
    `actif` TINYINT(1) NULL DEFAULT 1,
    PRIMARY KEY (`idcategorie`))
  ENGINE = InnoDB;

  -- Insert data into categorie
  INSERT INTO `ressources_relationnelles`.`categorie`
  (`libelle`)
  VALUES
  ('Sport'),
  ('Culture'),
  ('Environnement'),
  ('Politique'),
  ('Economie'),
  ('Société'),
  ('Technologie'),
  ('Sante');

  -- -----------------------------------------------------
  -- Table `ressources_relationnelles`.`ressource`
  -- -----------------------------------------------------
  CREATE TABLE IF NOT EXISTS `ressources_relationnelles`.`ressource` (
    `idressource` INT NOT NULL AUTO_INCREMENT,
    `lien` VARCHAR(255) NULL,
    `publication_idpublication` INT NOT NULL,
    PRIMARY KEY (`idressource`),
    INDEX `fk_ressource_publication1_idx` (`publication_idpublication` ASC) ,
    CONSTRAINT `fk_ressource_publication1`
      FOREIGN KEY (`publication_idpublication`)
      REFERENCES `ressources_relationnelles`.`publication` (`idpublication`)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION)
  ENGINE = InnoDB;

  -- Insert data into ressource
  INSERT INTO `ressources_relationnelles`.`ressource`
  (`lien`, `publication_idpublication`)
  VALUES
  ('https://example.com/image.jpg', 1),
  ('https://example.com/video.mp4', 2),
  ('https://example.com/document.pdf', 3);

  -- -----------------------------------------------------
  -- Table `ressources_relationnelles`.`ticket`
  -- -----------------------------------------------------
  CREATE TABLE IF NOT EXISTS `ressources_relationnelles`.`ticket` (
    `idticket` INT NOT NULL AUTO_INCREMENT,
    `objet` VARCHAR(45) NULL,
    `description` LONGTEXT NULL,
    `etat` TINYINT(1) NULL DEFAULT 0,
    `nom_createur` VARCHAR(45) NULL,
    `prenom_createur` VARCHAR(45) NULL,
    `citoyen_mail` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`idticket`),
    INDEX `fk_ticket_citoyen1_idx` (`citoyen_mail` ASC) ,
    CONSTRAINT `fk_ticket_citoyen1`
      FOREIGN KEY (`citoyen_mail`)
      REFERENCES `ressources_relationnelles`.`citoyen` (`mail`)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION)
  ENGINE = InnoDB;

  -- Insérer des données dans la table ticket
  INSERT INTO `ressources_relationnelles`.`ticket`
  (`objet`, `description`, `nom_createur`, `prenom_createur`, `citoyen_mail`)
  VALUES
  ('Problème de connexion', 'Je n''arrive pas à me connecter à mon compte.', 'Dupont', 'Jean', 'jean.dupont@example.com'),
  ('Erreur 404', 'Je rencontre une erreur 404 sur certaines pages.', 'Martin', 'Pierre', 'pierre.martin@example.com'),
  ('Problème de formulaire', 'Le formulaire ne fonctionne pas correctement.', 'Durand', 'Marie', 'marie.durand@example.com');

  -- -----------------------------------------------------
  -- Table `ressources_relationnelles`.`commentaire`
  -- -----------------------------------------------------
  CREATE TABLE IF NOT EXISTS `ressources_relationnelles`.`commentaire` (
    `idcommentaire` INT NOT NULL,
    `publication_idpublication` INT NOT NULL,
    `text_commentaire` LONGTEXT NULL,
    `commentaire_signale` TINYINT(1) NULL DEFAULT 0,
    `type` TINYINT(1) NULL,
    `citoyen_mail` VARCHAR(45) NOT NULL,
    INDEX `fk_citoyen_has_publication_publication1_idx` (`publication_idpublication` ASC) ,
    PRIMARY KEY (`idcommentaire`),
    INDEX `fk_commentaire_citoyen1_idx` (`citoyen_mail` ASC) ,
    CONSTRAINT `fk_citoyen_has_publication_publication1`
      FOREIGN KEY (`publication_idpublication`)
      REFERENCES `ressources_relationnelles`.`publication` (`idpublication`)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
    CONSTRAINT `fk_commentaire_citoyen1`
      FOREIGN KEY (`citoyen_mail`)
      REFERENCES `ressources_relationnelles`.`citoyen` (`mail`)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION)
  ENGINE = InnoDB;

  -- Insérer des données dans la table commentaire
  INSERT INTO `ressources_relationnelles`.`commentaire`
  (`idcommentaire`, `citoyen_mail`, `publication_idpublication`, `text_commentaire`, `type`)
  VALUES
  ('1', 'jean.dupont@example.com', 1, 'Super publication !', 0),
  ('2', 'pierre.martin@example.com', 2, 'Très intéressant !', 0),
  ('3', 'marie.durand@example.com', 3, 'Merci pour le partage !', 0);


  -- -----------------------------------------------------
  -- Table `ressources_relationnelles`.`demande_ami`
  -- -----------------------------------------------------
  CREATE TABLE IF NOT EXISTS `ressources_relationnelles`.`demande_ami` (
    `demande_validee` TINYINT(1) NULL DEFAULT 0,
    `citoyen_mail` VARCHAR(45) NOT NULL,
    `citoyen_mail1` VARCHAR(45) NOT NULL,
    `id_demande_ami` INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (`id_demande_ami`),
    INDEX `fk_demande_ami_citoyen1_idx` (`citoyen_mail` ASC) ,
    INDEX `fk_demande_ami_citoyen2_idx` (`citoyen_mail1` ASC) ,
    CONSTRAINT `fk_demande_ami_citoyen1`
      FOREIGN KEY (`citoyen_mail`)
      REFERENCES `ressources_relationnelles`.`citoyen` (`mail`)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
    CONSTRAINT `fk_demande_ami_citoyen2`
      FOREIGN KEY (`citoyen_mail1`)
      REFERENCES `ressources_relationnelles`.`citoyen` (`mail`)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION)
  ENGINE = InnoDB;

  -- Insérer des données dans la table DemandeAmi
  INSERT INTO `ressources_relationnelles`.`demande_ami`
  (`id_demande_ami`,`citoyen_mail`, `citoyen_mail1`, `demande_validee`)
  VALUES
  (1,'jean.dupont@example.com', 'pierre.martin@example.com', 0),
  (2,'jean.dupont@example.com', 'marie.durand@example.com', 0),
  (3,'pierre.martin@example.com', 'marie.durand@example.com', 0);

  -- -----------------------------------------------------
  -- Table `ressources_relationnelles`.`pub_cat`
  -- -----------------------------------------------------
  CREATE TABLE IF NOT EXISTS `ressources_relationnelles`.`pub_cat` (
    `publication_idpublication` INT NOT NULL,
    `categorie_idcategorie` INT NOT NULL,
    PRIMARY KEY (`publication_idpublication`, `categorie_idcategorie`),
    INDEX `fk_publication_has_categorie_categorie1_idx` (`categorie_idcategorie` ASC) ,
    INDEX `fk_publication_has_categorie_publication1_idx` (`publication_idpublication` ASC) ,
    CONSTRAINT `fk_publication_has_categorie_publication1`
      FOREIGN KEY (`publication_idpublication`)
      REFERENCES `ressources_relationnelles`.`publication` (`idpublication`)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
    CONSTRAINT `fk_publication_has_categorie_categorie1`
      FOREIGN KEY (`categorie_idcategorie`)
      REFERENCES `ressources_relationnelles`.`categorie` (`idcategorie`)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION)
  ENGINE = InnoDB;

  -- Insérer des données dans la table publicat
  INSERT INTO `ressources_relationnelles`.`pub_cat`
  (`publication_idpublication`, `categorie_idcategorie`)
  VALUES
  (1, 1),
  (2, 2),
  (3, 3);


  -- -----------------------------------------------------
  -- Table `ressources_relationnelles`.`choix_sondage_citoyen`
  -- -----------------------------------------------------
  CREATE TABLE IF NOT EXISTS `ressources_relationnelles`.`choixSondageCitoyen` (
    `ressource_idressource` INT NOT NULL,
    `choix_sondage_citoyen` VARCHAR(45) NULL,
    `citoyen_mail` VARCHAR(45) NOT NULL,
    INDEX `fk_table1_ressource1_idx` (`ressource_idressource` ASC) ,
    PRIMARY KEY (`citoyen_mail`),
    CONSTRAINT `fk_table1_ressource1`
      FOREIGN KEY (`ressource_idressource`)
      REFERENCES `ressources_relationnelles`.`ressource` (`idressource`)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
    CONSTRAINT `fk_Choix_sondage_citoyen_citoyen1`
      FOREIGN KEY (`citoyen_mail`)
      REFERENCES `ressources_relationnelles`.`citoyen` (`mail`)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION)
  ENGINE = InnoDB;


  -- Insérer des données dans la table choix_sondage_citoyen
  INSERT INTO `ressources_relationnelles`.`choixSondageCitoyen`
  (`citoyen_mail`, `ressource_idressource`, `choix_sondage_citoyen`)
  VALUES
  ('jean.dupont@example.com', 1, 'Oui'),
  ('pierre.martin@example.com', 2, 'Non'),
  ('marie.durand@example.com', 3, 'Peut-être');

  SET SQL_MODE=@OLD_SQL_MODE;
  SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
  SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;