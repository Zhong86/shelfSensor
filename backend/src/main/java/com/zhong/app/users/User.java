package com.zhong.app.users;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id; 

  @Column(nullable = false)
  String name; 

  @Column(nullable = false, unique = true)
  String email;

  @Column(nullable = false)
  String password; 

  @Column(nullable = false, columnDefinition = "VARCHAR(20) DEFAULT 'USER'")
  String role;

  @Column(name = "refresh_token")
  String refreshToken; 

  @Column(name = "refresh_token_expiry")
  LocalDateTime refreshTokenExpiry;

  public User() {}

  public User(String name, String email, String password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getRefreshToken() {
    return refreshToken;
  }

  public void setRefreshToken(String refreshToken) {
    this.refreshToken = refreshToken;
  }

  public LocalDateTime getRefreshTokenExpiry() {
    return refreshTokenExpiry;
  }

  public void setRefreshTokenExpiry(LocalDateTime refreshTokenExpiry) {
    this.refreshTokenExpiry = refreshTokenExpiry;
  }
}
