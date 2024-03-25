package com.example.exemple;

import java.awt.EventQueue;
import java.sql.Connection;
import java.sql.DriverManager;

import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ExempleApplication {

	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				// Informations de connexion à la base de données MySQL
				String bdd = "ressources_relationnelles";
				String url = "jdbc:mysql://localhost:3306/" + bdd;
				String username = "root";

				try {
					// Établissement de la connexion
					Class.forName("com.mysql.cj.jdbc.Driver");
					Connection conn = DriverManager.getConnection(url, username, "");
					System.out.println("Connexion réussi");
				} catch (Exception e) {
					e.printStackTrace();
					System.out.println("Erreur de connexion");
					System.exit(0);
				}
			}
		});
	}

}
