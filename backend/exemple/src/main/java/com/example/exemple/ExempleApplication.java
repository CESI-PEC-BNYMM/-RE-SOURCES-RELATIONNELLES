package com.example.exemple;


import java.awt.EventQueue;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ExempleApplication {

	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				// Informations de connexion à la base de données MySQL

				try {
					Class.forName("com.mysql.cj.jdbc.Driver");
				} catch (ClassNotFoundException e) {
					e.printStackTrace();
					System.out.println("Driver class not found");
					System.exit(0);
				}
				String bdd = "ressources_relationnelles";
				String url = "jdbc:mysql://localhost:3306/" + bdd;
				String username = "root";
				/*
				 * try {
				 * // Établissement de la connexion
				 * Class.forName("com.mysql.cj.jdbc.Driver");
				 * Connection conn = DriverManager.getConnection(url, username, "");
				 * System.out.println("Connexion réussi");
				 * } catch (Exception e) {
				 * e.printStackTrace();
				 * System.out.println("Erreur de connexion");
				 * System.exit(0);
				 * }
				 */

				/*try {
					Connection conn = DriverManager.getConnection(url, username, "");
					// Insérer dans une catégorie
					String requete = "INSERT INTO Categorie (libelle, actif) VALUES ('tataki', 1)";
					try (Statement statement = conn.createStatement()) {
						statement.executeUpdate(requete, Statement.RETURN_GENERATED_KEYS);
						// Récupérer l'ID auto-incrémenté
						try (ResultSet resultSet = statement.getGeneratedKeys()) {
							if (resultSet.next()) {
								long idCategorie = resultSet.getLong(1);
								System.out.println("ID de la catégorie ajoutée : " + idCategorie);
							}
						}
					}

				} catch (Exception e) {
					System.out.println("Erreur : " + e.getMessage());
				}*/
				try {
                    Connection search = DriverManager.getConnection(url, username, "");
                    String requette2 = "SELECT * FROM Categorie";
                    try (Statement statement = search.createStatement();
                         ResultSet resultSet = statement.executeQuery(requette2)) {
                        while (resultSet.next()) {
                            // Récupération des données
                            int idCategorie = resultSet.getInt("idCategorie");
                            String libelle = resultSet.getString("libelle");
                            int actif = resultSet.getInt("actif");
                            // Affichage des données récupérées
                            System.out.println("idCategorie: " + idCategorie + ", libelle: " + libelle + ", actif: " + actif);
                        }
                    }
                } catch (Exception e) {
                    // Gestion des erreurs
                    System.out.println("Erreur");
                }
            }
        });
    }
}