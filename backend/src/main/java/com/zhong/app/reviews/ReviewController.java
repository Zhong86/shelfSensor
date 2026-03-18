package com.zhong.app.reviews;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zhong.app.reviews.dto.UpdateReviewRequest;
import com.zhong.app.reviews.dto.CreateReviewRequest;
import com.zhong.app.reviews.dto.ReviewResponse;

@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {
  private final ReviewService reviewService;

  public ReviewController(ReviewService reviewService) {
    this.reviewService = reviewService;
  } 
  
  @GetMapping("/{bookId}")
  public ResponseEntity<Page<ReviewResponse>> GetReviews(
    @PathVariable() Integer bookId,
    @RequestParam(defaultValue = "0") int page, 
    @RequestParam(defaultValue = "5") int size
  ) {

    return ResponseEntity.ok(reviewService.getReviews(bookId, page, size));
  }

  @PostMapping()
  public ResponseEntity<ReviewResponse> AddReview(@RequestBody CreateReviewRequest req) {
    int userId = getUserId();
    return ResponseEntity.ok(reviewService.addReview(userId, req));
  }

  @PutMapping("/{id}")
  public ResponseEntity<ReviewResponse> UpdateReview(@PathVariable Integer id, @RequestBody UpdateReviewRequest req) {
    
    return ResponseEntity.ok(reviewService.updateReview(id, req));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> DeleteReview(@PathVariable Integer id) {
    reviewService.deleteReview(id);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }

  private int getUserId() {
    return (int) SecurityContextHolder.getContext()
    .getAuthentication().getDetails();
  }
}
