package com.zhong.app.reviews;

import java.time.LocalDateTime;


import com.zhong.app.books.Book;
import com.zhong.app.users.User;

import jakarta.persistence.CheckConstraint;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(
  name = "reviews", 
  check = @CheckConstraint(name = "rating_range", constraint = "rating >= 0 AND rating <= 5")
)
public class Review {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id; 
  
  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user; 

  @ManyToOne
  @JoinColumn(name = "book_id", nullable = false)
  private Book book; 
  
  @Column(nullable = false)
  private int rating; 
  
  @Column(name = "content", nullable = true)
  private String content; 
  
  @Column(name = "updated_at", insertable = false, nullable = false)
  private LocalDateTime updatedAt;

  public Review() {
  }

  public Review(User user, Book book, int rating, String content, LocalDateTime updatedAt ) {
    this.user = user;
    this.book = book;
    this.rating = rating;
    this.content = content;
    this.updatedAt = updatedAt;
  }

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
