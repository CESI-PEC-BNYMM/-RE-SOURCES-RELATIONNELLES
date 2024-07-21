package com.rr.utils;

import java.security.Key;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    private static final long EXPIRATION_TIME = 3600000; // 1 hour
    private static Key key;

    @jakarta.annotation.PostConstruct
    public void init() {
        key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(generateSecretKey()));
    }

    /**
     * Generates a secret key for the JWT tokens. The key is 32 bytes long, which is
     * the recommended size for the HMAC-SHA256 algorithm.
     * The key is generated using the SecureRandom class, which provides a
     * cryptographically strong random number generator.
     * The key is then encoded using the Base64 encoder, which produces a string
     * that is safe to use in URLs.
     * 
     * @return the secret key as a string
     */
    private static String generateSecretKey() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[32];
        random.nextBytes(bytes);
        return Base64.getEncoder().encodeToString(bytes);
    }

    /**
     * Generates a JWT token for the given email address.
     * 
     * @param email The email address to generate the token for.
     * @return The generated JWT token.
     */
    public static String generateToken(String email) {
        // Set the email address as the subject of the JWT token.
        // Set the issued date to the current time.
        // Set the expiration date to one hour from the current time.
        // Sign the JWT token with the key using the HMAC-SHA256 algorithm.
        // Compact the JWT token into a string.
        return Jwts.builder().setSubject(email).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Extracts the email address from the JWT token.
     * This method assumes the token contains the email as the subject of its
     * claims.
     * The "Bearer " prefix, if present, is removed before parsing.
     * 
     * @param token The JWT token from which the email is to be extracted.
     * @return The email address contained within the token's subject.
     * @throws ExpiredJwtException if the token has expired.
     * @throws JwtException        if the token cannot be parsed.
     */
    public static String getEmailFromToken(String token) {
        // Remove the "Bearer " prefix from the token, if present.
        token = token.replace("Bearer ", "");

        // Parse the token and return the subject (email).
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject();
    }

    /**
     * Validates the given JWT token.
     * It checks if the token is valid by parsing it and verifying the signature.
     *
     * @param token the JWT token to be validated
     * @return true if the token is valid, false otherwise
     */
    public static boolean validateToken(String token) {
        try {
            // Remove the "Bearer " prefix from the token, if present.
            token = token.replace("Bearer ", "");
            // Parse the token and verify the signature using the secret key.
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            // If parsing and verification are successful, the token is valid.
            return true;
        } catch (Exception e) {
            // If any exception occurs during parsing or verification, the token is
            // considered invalid.
            return false;
        }
    }
}
