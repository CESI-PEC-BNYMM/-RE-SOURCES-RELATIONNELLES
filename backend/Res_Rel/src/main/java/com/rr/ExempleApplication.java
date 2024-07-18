package com.rr;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication(exclude = {
		org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class,
}
)

public class ExempleApplication {

	@Bean
	public BCryptPasswordEncoder passwordEncoder (){

		return new BCryptPasswordEncoder();
	}

	public static void main(String[] args) {

		SpringApplication.run(ExempleApplication.class,args);

	/*	ConfigurableApplicationContext context = SpringApplication.run(ExempleApplication.class, args);

		JdbcTemplate jdbcTemplate = context.getBean(JdbcTemplate.class);

		String sql = "SELECT * FROM Categorie";

		List<Categorie> categories = jdbcTemplate.query(sql, new RowMapper<Categorie>() {
			@Override
			public Categorie mapRow(ResultSet resultSet, int i) throws SQLException {
				Categorie categorie = new Categorie();
				categorie.setIdCategorie(resultSet.getInt("idCategorie"));
				categorie.setLibelle(resultSet.getString("libelle"));
				//categorie.setActif(resultSet.getInt("actif"));
				return categorie;
			}
		});

		for (Categorie categorie : categories) {
			System.out.println("idCategorie: " + categorie.getIdCategorie() + ", libelle: " + categorie.getLibelle());
		}*/
		/*EventQueue.invokeLater(new Runnable() {
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

				/*
				 * try {
				 * Connection conn = DriverManager.getConnection(url, username, "");
				 * // Insérer dans une catégorie
				 * String requete =
				 * "INSERT INTO Categorie (libelle, actif) VALUES ('tataki', 1)";
				 * try (Statement statement = conn.createStatement()) {
				 * statement.executeUpdate(requete, Statement.RETURN_GENERATED_KEYS);
				 * // Récupérer l'ID auto-incrémenté
				 * try (ResultSet resultSet = statement.getGeneratedKeys()) {
				 * if (resultSet.next()) {
				 * long idCategorie = resultSet.getLong(1);
				 * System.out.println("ID de la catégorie ajoutée : " + idCategorie);
				 * }
				 * }
				 * }
				 * 
				 * } catch (Exception e) {
				 * System.out.println("Erreur : " + e.getMessage());
				 * }
				 */
			/*	try {
					Connection search = DriverManager.getConnection(url);
					String requette2 = "SELECT * FROM `Categorie`";
					try (Statement statement = search.createStatement();
							ResultSet resultSet = statement.executeQuery(requette2)) {
						while (resultSet.next()) {
							// Récupération des données
							int idCategorie = resultSet.getInt("idCategorie");
							String libelle = resultSet.getString("libelle");
							//int actif = resultSet.getInt("actif");
							// Affichage des données récupérées
							System.out.println(
									"idCategorie: " + idCategorie + ", libelle: " + libelle);
						}
					}
				} catch (Exception e) {
					// Gestion des erreurs
					System.out.println(e);
				}
				try {
					System.out.println("Press Enter to exit...");
					System.in.read(); // attend que l'utilisateur clique sur entrer pour arrêter le processus
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		});*/
	}
}