package com.zhong.app.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.zhong.app.users.dto.CreateUserRequest;
import com.zhong.app.users.dto.UpdateUserRequest;
import com.zhong.app.users.dto.UserResponse;

@Service
public class UserService {

  private final UserRepository userRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public UserResponse getUserById(int id) {
    User user = userRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("User not found"));

    UserResponse response = new UserResponse();
    response.setId(user.getId());
    response.setName(user.getName());
    response.setEmail(user.getEmail());
    response.setRole(user.getRole());

    return response;
  }

  public UserResponse createUser(CreateUserRequest req) {
    User user = new User();
    user.setName(req.getName());
    user.setEmail(req.getEmail());
    user.setRole("USER");
    String hashed = passwordEncoder.encode(req.getPassword());
    user.setPassword(hashed);

    User saved = userRepository.save(user);

    UserResponse response = new UserResponse(); 
    response.setId(saved.getId());
    response.setName(saved.getName());
    response.setEmail(saved.getEmail());
    response.setRole(saved.getRole());

    return response;
  }

  public UserResponse updateUser(int id, UpdateUserRequest user) {
    User existing = userRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("User not found"));

    existing.setName(user.getName());
    String hashed = passwordEncoder.encode(user.getPassword());
    existing.setPassword(hashed);

    User saved = userRepository.save(existing);
    
    UserResponse response = new UserResponse();
    response.setId(saved.getId());
    response.setName(saved.getName());
    response.setEmail(saved.getEmail());
    response.setRole(saved.getRole());

    return response;
  }

  public void deleteUser(int id) {
    if(!userRepository.existsById(id))
      throw new RuntimeException("User not found");
    userRepository.deleteById(id);
  }
}
