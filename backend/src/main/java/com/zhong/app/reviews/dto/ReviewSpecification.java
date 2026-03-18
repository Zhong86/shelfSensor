package com.zhong.app.reviews.dto;

import org.springframework.data.jpa.domain.Specification;

import com.zhong.app.reviews.Review;

public class ReviewSpecification {
  public static Specification<Review> hasBookId(Integer bookId) {
    return (root, query, cb) -> cb.equal(root.get("book").get("id"), bookId);
  }

}
