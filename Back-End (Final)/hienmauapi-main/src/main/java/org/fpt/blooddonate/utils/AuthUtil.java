package org.fpt.blooddonate.utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.fpt.blooddonate.models.User;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Base64;
import java.util.Date;

@Component
public class AuthUtil {

    private final long EXPIRATION_TIME = 86400000;
    private final String SECRET = "aVeryLongSecretKeyForJWTThatIsAtLeast32Bytes!";

    private final Key key = new SecretKeySpec(
        Base64.getDecoder().decode(Base64.getEncoder().encodeToString(SECRET.getBytes())),
        SignatureAlgorithm.HS256.getJcaName()
    );

    public String generateToken(User user) {
        return Jwts.builder()
            .setSubject(user.getEmail())
            .claim("id", user.getId())
            .claim("role", user.getVaiTro())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
            .signWith(key)
            .compact();
    }

    public Integer extractUserId(String token) {
        return (Integer) Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .getBody()
            .get("id");
    }

    public String extractRole(String token) {
        return (String) Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .getBody()
            .get("role");
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
