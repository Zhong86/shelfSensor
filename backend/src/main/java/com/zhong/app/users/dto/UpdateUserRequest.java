package com.zhong.app.users.dto;

public class UpdateUserRequest {
  String name; 
  String password;

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
