package com.zhong.app.books;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class BookService {
  private final BookRepository bookRepository; 
  private final GenreRepository genreRepository; 

  public BookService(BookRepository bookRepository, GenreRepository genreRepository) {
    this.bookRepository = bookRepository;
    this.genreRepository = genreRepository;
  }

  public BookResponse getBookByIsbn(String isbn) {
    Book book = bookRepository.findByIsbn(isbn)
      .orElseThrow(() -> new RuntimeException("Book not found"));

    BookResponse response = setBookResponseData(book);
    return response; 
  }

  public Page<BookResponse> getBooks(int page, int size) {
    PageRequest pageable = PageRequest.of(page, size); 
    Page<Book> books = bookRepository.findAll(pageable); 
    
    return books.map(book -> {
      BookResponse response = setBookResponseData(book);
      return response; 
    }); 
  }

  public List<String> getGenres() {
    return genreRepository.findAll()
      .stream()
      .map(Genre::getName)
      .collect(Collectors.toList());
  }

  public BookResponse setBookResponseData(Book book) {
    BookResponse response = new BookResponse(); 
    response.setTitle(book.getTitle());
    response.setIsbn(book.getIsbn());
    response.setPublishedYear(book.getPublishedYear());
    response.setDescription(book.getDescription());

    List<String> authors = book.getAuthors()
    .stream()
    .map(Author::getName)
    .collect(Collectors.toList());
    response.setAuthors(authors);

    List<String> genres = book.getGenres()
    .stream()
    .map(Genre::getName)
    .collect(Collectors.toList());
    response.setGenres(genres);
    return response; 
  }
}
