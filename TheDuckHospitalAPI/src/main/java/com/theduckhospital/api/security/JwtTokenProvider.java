package com.theduckhospital.api.security;

import com.theduckhospital.api.repository.AccountRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private SecretKey getSingingKey() {
        String JWT_SECRET = "1V0UqQy1iDfCX9iiR3PStGtyLPNy138O1V0UqQy1iDfCX9iiR3PStGtyLPNy138O";
        return Keys.hmacShaKeyFor(JWT_SECRET.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(CustomUserDetails userDetails) {
        Date now = new Date();
        long JWT_EXPIRATION = 604800000L;
        Date expiryDate = new Date(now.getTime() + JWT_EXPIRATION);

        return Jwts.builder()
                .subject(String.valueOf((userDetails.getAccount().getUserId())))
                .claim("userId", userDetails.getAccount().getUserId())
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(getSingingKey())
                .compact();
    }

    public String getUserIdFromJwt(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(getSingingKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return claims.getSubject();
    }


    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().verifyWith(getSingingKey()).build().parseSignedClaims(authToken).getPayload();
            return true;
        } catch (MalformedJwtException ex) {
            throw new MalformedJwtException("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            throw new ExpiredJwtException(null, null, "Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            throw new UnsupportedJwtException("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException("JWT claims string is empty");
        }
    }
}
