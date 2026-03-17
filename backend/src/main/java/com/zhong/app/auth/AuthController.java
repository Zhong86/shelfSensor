package com.zhong.app.auth;
import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zhong.app.users.User;
import com.zhong.app.users.UserRepository;
import com.zhong.app.users.UserService;
import com.zhong.app.users.dto.UserResponse;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
  @Autowired
  private AuthenticationManager authManager;

  @Autowired
  private JwtService jwtService;

  @Autowired
  private UserService userService;

  @Autowired
  private UserRepository userRepository;

  @PostMapping("/register")
  public ResponseEntity<Map<String,String>> register(@RequestBody RegisterRequest user) {
    UserResponse newUser = userService.createUser(user);
    Map<String, String> tokens = generateTokens(newUser.getEmail(), newUser.getId());
    return ResponseEntity.status(HttpStatus.CREATED).body(tokens);
  }


  @PostMapping("/login")
  public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest req) {
    authManager.authenticate(
      new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
    );
    User user = userRepository.findByEmail(req.getEmail())
      .orElseThrow(() -> new RuntimeException("User not found"));

    Map<String, String> tokens = generateTokens(req.getEmail(), user.getId());
    return ResponseEntity.ok(tokens);
  }

  @PostMapping("/refresh")
  public ResponseEntity<Map<String, String>> refresh(@RequestBody Map<String, String> req) {
    String refreshToken = req.get("refreshToken");

    User user = userRepository.findByRefreshToken(refreshToken)
      .orElseThrow(() -> new RuntimeException("Invalid refresh token"));

    if (user.getRefreshTokenExpiry().isBefore(LocalDateTime.now())) 
      throw new RuntimeException("Refresh token expired");

    String newAccessToken = jwtService.generateToken(user.getEmail(), user.getId());
    return ResponseEntity.ok(Map.of("accessToken", newAccessToken));
  }

  public Map<String, String> generateTokens(String email, int id) {
    String accessToken = jwtService.generateToken(email, id);
    String refreshToken = jwtService.generateRefreshToken();

    User user = userRepository.findByEmail(email)
      .orElseThrow(() -> new RuntimeException("User not found"));
    user.setRefreshToken(refreshToken);
    user.setRefreshTokenExpiry(jwtService.getRefreshTokenExpiry());
    userRepository.save(user);

    return Map.of(
      "accessToken", accessToken, 
      "refreshToken", refreshToken
    );
  }
}
