package com.zhong.app.auth;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
  @Value("${security.jwt.secret-key}")
  String secretKey;
  
  @Value("${security.jwt.expiration-time}")
  long EXPIRATION_MS;

  public String generateRefreshToken() {
    return UUID.randomUUID().toString();
  }

  public LocalDateTime getRefreshTokenExpiry() {
    return LocalDateTime.now().plusDays(7);
  }

  private SecretKey getSigningKey() {
    return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
  }

  public String generateToken(String email, int userId) {
    return Jwts.builder() 
      .subject(email)
      .claim("userId", userId)
      .issuedAt(new Date())
      .expiration(new Date(System.currentTimeMillis() + EXPIRATION_MS))
      .signWith(getSigningKey())
      .compact();
  }

  public String extractEmail(String token) {
    return Jwts.parser()
      .verifyWith(getSigningKey())
      .build()
      .parseSignedClaims(token)
      .getPayload()
      .getSubject();
  }

  public int extractUserId(String token) {
    return Jwts.parser()
      .verifyWith(getSigningKey())
      .build()
      .parseSignedClaims(token)
      .getPayload()
      .get("userId", Integer.class);
  }

  public boolean isTokenValid(String token) {
    try {
      Jwts.parser().verifyWith(getSigningKey()).build().parseSignedClaims(token);
      return true;
    } catch (JwtException e) {
      return false;
    }
  }
}
