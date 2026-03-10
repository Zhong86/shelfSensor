package com.zhong.app.books;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "books")
public class Book {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @Column(nullable = false)
  private String title;

  @Column(nullable = false, unique = true)
  private String isbn; 

  @Column(nullable = false)
  private int publishedYear; 

  @Column()
  private String description;

  @ManyToMany
  @JoinTable(
    name = "book_authors",
    joinColumns = @JoinColumn(name = "book_id"), 
    inverseJoinColumns = @JoinColumn(name = "author_id")
  )
  private List<Author> authors;

  @ManyToMany
  @JoinTable(
    name = "book_genres", 
    joinColumns = @JoinColumn(name = "book_id"), 
    inverseJoinColumns = @JoinColumn(name = "genre_id")
  )
  private List<Genre> genres;

  public Book() {
  }

  public Book(String title, String isbn, int publishedYear, String description, List<Author> authors, List<Genre> genres) {
    this.title = title;
    this.isbn = isbn;
    this.publishedYear = publishedYear;
    this.description = description;
    this.authors = authors; 
    this.genres = genres; 
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getIsbn() {
    return isbn;
  }

  public void setIsbn(String isbn) {
    this.isbn = isbn;
  }

  public int getPublishedYear() {
    return publishedYear;
  }

  public void setPublishedYear(int publishedYear) {
    this.publishedYear = publishedYear;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public List<Author> getAuthors() {
    return authors;
  }

  public void setAuthors(List<Author> authors) {
    this.authors = authors;
  }

  public List<Genre> getGenres() {
    return genres;
  }

  public void setGenres(List<Genre> genres) {
    this.genres = genres;
  }
}

