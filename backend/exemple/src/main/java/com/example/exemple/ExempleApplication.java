package com.example.exemple;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ExempleApplication {

	public static void main(String[] args) {
		SpringApplication.run(ExempleApplication.class, args);
		// Informations de connexion à la base de données MySQL
        String url = "jdbc:mysql://localhost:3306/ressources_relationnelles?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC";
        String username = "root";

        // Requête SQL pour créer les tables
        String sql = "CREATE TABLE IF NOT EXISTS Citoyen (" +
                "idCitoyen INT NOT NULL AUTO_INCREMENT," +
                "nom VARCHAR(45) NULL," +
                "prenom VARCHAR(45) NULL," +
                "mail VARCHAR(45) NULL," +
                "numTel VARCHAR(10) NULL," +
                "numSec VARCHAR(13) NULL," +
                "role VARCHAR(45) NULL," +
                "dateNaissance DATE NULL," +
                "sexe CHAR(1) NULL," +
                "actif TINYINT(1) NULL DEFAULT 1," +
                "validaton TINYINT(1) NULL DEFAULT 1," +
                "codePostal VARCHAR(5) NULL," +
                "ville VARCHAR(45) NULL," +
                "mdp VARCHAR(512) NULL," +
                "dateDerniereConnexion DATETIME NULL," +
                "PRIMARY KEY (idCitoyen)" +
                ");" +
                "CREATE TABLE IF NOT EXISTS Publication (" +
                "idPublication INT NOT NULL AUTO_INCREMENT," +
                "description LONGTEXT NULL," +
                "datePub DATETIME NULL," +
                "pubValidee TINYINT(1) NULL DEFAULT 0," +
                "pubSignalee TINYINT(1) NULL DEFAULT 0," +
                "nbrVues INT NULL," +
                "idCitoyen INT NOT NULL," +
                "PRIMARY KEY (idPublication)," +
                "FOREIGN KEY (idCitoyen) REFERENCES" +
				"Citoyen(idCitoyen) ON DELETE NO ACTION ON UPDATE NO ACTION" +
                ");" +
                // Créez les autres tables ici...
                // Assurez-vous de respecter les contraintes de clé étrangère entre les tables
                // N'oubliez pas de gérer les autres tables du schéma
                "";

         try {
            // Établissement de la connexion
            Connection conn = DriverManager.getConnection(url, username, "");
            Statement stmt = conn.createStatement();

            // Exécution de la requête SQL
            stmt.executeUpdate(sql);

            // Fermeture de la connexion
            stmt.close();
            conn.close();

            System.out.println("Tables créées avec succès !");
        } catch (SQLException e) {
            e.printStackTrace();
        }
		
	}

}
