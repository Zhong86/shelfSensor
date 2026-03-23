package com.zhong.app.books;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import com.zhong.app.SecurityConfig;
import com.zhong.app.auth.CustomUserDetailsService;
import com.zhong.app.auth.JwtService;

@WebMvcTest(BookController.class)
@Import(SecurityConfig.class)
class BookControllerTest {
  @Autowired MockMvc mockMvc;
  @MockBean BookService bookService;
  @MockBean JwtService jwtService; 
  @MockBean CustomUserDetailsService userDetailsService;
  
  @Test
  @WithMockUser
  void getBookByIsbn_returns200() throws Exception {
    BookResponse response = new BookResponse();
    response.setTitle("Dune");
    response.setIsbn("978-0441013593");

    when(bookService.getBookByIsbn("978-0441013593")).thenReturn(response);

    mockMvc.perform(get("/api/v1/books/978-0441013593"))
      .andExcept(status().isOk())
      .andExcept(jsonPath("$.title").value("Dune"));
  }
}
