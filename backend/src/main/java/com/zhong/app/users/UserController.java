package com.zhong.app.users;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zhong.app.users.dto.UpdateUserRequest;
import com.zhong.app.users.dto.UserResponse;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
  private final UserService userService; 

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("/{id}")
  public ResponseEntity<UserResponse> getUserById(@PathVariable int id) {
    return ResponseEntity.ok(userService.getUserById(id));
  }
 
  @PutMapping("/{id}")
  public ResponseEntity<UserResponse> updateUser(@PathVariable int id, @RequestBody UpdateUserRequest user) {
    return ResponseEntity.ok(userService.updateUser(id, user));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteUser(@PathVariable int id) {
    userService.deleteUser(id);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }
}
