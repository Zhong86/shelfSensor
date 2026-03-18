package com.zhong.app.reviews.dto;

public class UpdateReviewRequest {
  private int rating; 
  private String content;

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
}
