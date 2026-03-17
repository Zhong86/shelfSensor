package com.zhong.app.auth;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthFilter extends OncePerRequestFilter{
  @Autowired
  private JwtService jwtService; 

  @Autowired 
  private UserDetailsService userDetailsService;

  @Override
  protected void doFilterInternal(
    HttpServletRequest req, 
    HttpServletResponse res, 
    FilterChain chain) 
  throws ServletException, IOException {
    String authHeader = req.getHeader("Authorization");

    if (authHeader == null || !authHeader.startsWith("Bearer")) {
      chain.doFilter(req, res); 
      return;
    }

    String token = authHeader.substring(7);

    if (jwtService.isTokenValid(token)) {
      String email = jwtService.extractEmail(token);
      int userId = jwtService.extractUserId(token);

      UserDetails userDetails = userDetailsService.loadUserByUsername(email); 
      
      UsernamePasswordAuthenticationToken authToken = 
        new UsernamePasswordAuthenticationToken(
          userDetails, null, userDetails.getAuthorities());

      authToken.setDetails(userId);
      SecurityContextHolder.getContext().setAuthentication(authToken);
    }

    chain.doFilter(req, res);
  }
}
