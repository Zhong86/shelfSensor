package com.zhong.app.books;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.when;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@ExtendWith(MockitoExtension.class)
class BookServiceTest {
  @Mock BookRepository bookRepository;
  @InjectMocks BookService bookService; 
  
  @Test
  void getBookByIsbn_found_returnsResponse() {
    Book book = new Book("Clean Code", "978-0132350884", 2008, "A book about code",
        List.of(new Author("Robert Martin", "")),
        List.of(new Genre("Programming")));

    when(bookRepository.findByIsbn("978-0132350884")).thenReturn(Optional.of(book));

    BookResponse result = bookService.getBookByIsbn("978-0132350884");

    assertThat(result.getTitle()).isEqualTo("Clean Code");
    assertThat(result.getAuthors()).containsExactly("Robert Martin");
  }

  @Test 
  void getBookByIsbn_notFound_throwsException() {
    when(bookRepository.findByIsbn("000")).thenReturn(Optional.empty());
    assertThatThrownBy(() -> bookService.getBookByIsbn("000"))
      .isInstanceOf(RuntimeException.class)
      .hasMessage("Book not found");
  }
}
