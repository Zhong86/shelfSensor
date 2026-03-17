package com.zhong.app.entries;

import com.zhong.app.books.Book;

public class EntryResponse {
  private Book book;
  private String status;
  private Boolean favorite;
  private String notes;


  public Book getBook() {
    return book;
  }
  public void setBook(Book book) {
    this.book = book;
  }
  public String getStatus() {
    return status;
  }
  public void setStatus(String status) {
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
