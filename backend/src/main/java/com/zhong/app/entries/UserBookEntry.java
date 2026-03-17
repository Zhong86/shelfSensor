package com.zhong.app.entries;

import com.zhong.app.books.Book;
import com.zhong.app.users.User;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_books")
public class UserBookEntry {
  @EmbeddedId
  private UserBookId id; 

  @ManyToOne
  @MapsId("userId")
  @JoinColumn(name = "user_id", nullable = false)
  private User user; 

  @ManyToOne
  @MapsId("bookId")
  @JoinColumn(name = "book_id", nullable = false) 
  private Book book;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private ReadingStatus status; 

  private Boolean favorite = false; 

  private String notes; 

  public enum ReadingStatus {
    READING, 
    READ_LATER, 
    COMPLETED
  }

  public UserBookEntry() {
    this.id = new UserBookId();
  }

  public UserBookEntry(User user, Book book, ReadingStatus status, String notes) {
    this.id = new UserBookId(user.getId(), book.getId());
    this.user = user; 
    this.book = book;
    this.status = status;
    this.notes = notes;
  }

  public ReadingStatus getStatus() {
    return status;
  }

  public void setStatus(ReadingStatus status) {
    this.status = status;
  }

  public Boolean getFavorite() {
    return favorite;
  }

  public void setFavorite(Boolean favorite) {
    this.favorite = favorite;
  }

  public String getNotes() {
    return notes;
  }

  public void setNotes(String notes) {
    this.notes = notes;
  }

  public UserBookId getId() {
    return id;
  }

  public void setId(UserBookId id) {
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
}
