package com.zhong.app.books;

import java.util.List;

public class BookResponse {
  private String title; 
  private String isbn; 
  private int publishedYear; 
  private String description; 
  private List<String> authors; 
  private List<String> genres;

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
  public List<String> getAuthors() {
    return authors;
  }
  public void setAuthors(List<String> authors) {
    this.authors = authors;
  }
  public List<String> getGenres() {
    return genres;
  }
  public void setGenres(List<String> genres) {
    this.genres = genres;
  }
}

