package com.zhong.app.books;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/books")
public class BookController {
  private final BookService bookService; 


  public BookController(BookService bookService) {
    this.bookService = bookService;
  }

  @GetMapping("/{isbn}") 
  public ResponseEntity<BookResponse> GetBook(@PathVariable String isbn) {
    return ResponseEntity.ok(bookService.getBookByIsbn(isbn));
  }

  @GetMapping()
  public ResponseEntity<Page<BookResponse>> GetBooks(
    @RequestParam(defaultValue = "0") int page, 
    @RequestParam(defaultValue = "5") int size
  ) {
    return ResponseEntity.ok(bookService.getBooks(page, size));
  }
}
