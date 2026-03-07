package com.zhong.app;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

public class JwtService {
  @Value("${security.jwt.secret-key}")
  String secretKey;
  
  @Value("${security.jwt.expiration-time}")
  long EXPIRATION_MS;

  private SecretKey getSigningKey() {
    return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
  }

  public String generateToken(String email) {
    return Jwts.builder() 
      .subject(email)
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

  public boolean isTokenValid(String token) {
    try {
      Jwts.parser().verifyWith(getSigningKey()).build().parseSignedClaims(token);
      return true;
    } catch (JwtException e) {
      return false;
    }
  }
}
