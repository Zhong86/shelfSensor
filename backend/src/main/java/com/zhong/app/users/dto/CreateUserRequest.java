package com.zhong.app.users.dto;

public class CreateUserRequest {
  String name; 
  String email; 
  String password;
  String role;

  public String getRole() {
    return role;
  }
  public void setRole(String role) {
    this.role = role;
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
}
