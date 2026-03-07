package com.zhong.app.users.dto;

public class UserResponse {
  int id; 
  String name; 
  String email;
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
  public int getId() {
    return id;
  }
  public void setId(int id) {
    this.id = id;
  }
}
