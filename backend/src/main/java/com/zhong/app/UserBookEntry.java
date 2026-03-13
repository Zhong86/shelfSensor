package com.zhong.app;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

public class UserBookEntry {
  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private int userId; 

  @ManyToOne
  @JoinColumn(name = "book_id", nullable = false) 
  private int bookId;

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
  }

  public UserBookEntry(int userId, int bookId, ReadingStatus status, String notes) {
    this.userId = userId;
    this.bookId = bookId;
    this.status = status;
    this.notes = notes;
  }

  public int getUserId() {
    return userId;
  }

  public void setUserId(int userId) {
    this.userId = userId;
  }

  public int getBookId() {
    return bookId;
  }

  public void setBookId(int bookId) {
    this.bookId = bookId;
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
}
