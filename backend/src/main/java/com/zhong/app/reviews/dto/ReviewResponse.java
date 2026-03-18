package com.zhong.app.reviews.dto;

import java.time.LocalDateTime;

import com.zhong.app.books.Book;
import com.zhong.app.users.User;

public class ReviewResponse {
  private Integer id; 
  private User user; 
  private Book book; 
  private int rating; 
  private String content; 
  private LocalDateTime updatedAt;

  public Integer getId() {
    return id;
  }
  public void setId(Integer id) {
    this.id = id;
  }
  public User getUser() {
    return user;
  }
  public void setUser(User user) {
    this.user = user;
  }
  public Book getBook() {
    return book;
  }
  public void setBook(Book book) {
    this.book = book;
  }
  public int getRating() {
    return rating;
  }
  public void setRating(int rating) {
    this.rating = rating;
  }
  public String getContent() {
    return content;
  }
  public void setContent(String content) {
    this.content = content;
  }
  public LocalDateTime getUpdatedAt() {
    return updatedAt;
  }
  public void setUpdatedAt(LocalDateTime updatedAt) {
    this.updatedAt = updatedAt;
  }
}
