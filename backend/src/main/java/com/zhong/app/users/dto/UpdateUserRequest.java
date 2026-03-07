package com.zhong.app.users.dto;

public class UpdateUserRequest {
  String name; 
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
  public String getPassword() {
    return password;
  }
  public void setPassword(String password) {
    this.password = password;
  }
}
