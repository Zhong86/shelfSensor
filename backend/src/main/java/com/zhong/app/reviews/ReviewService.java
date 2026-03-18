package com.zhong.app.reviews;

import com.zhong.app.users.User;
import com.zhong.app.users.UserRepository;
import com.zhong.app.books.Book;
import com.zhong.app.books.BookRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.zhong.app.reviews.dto.UpdateReviewRequest;
import com.zhong.app.reviews.dto.CreateReviewRequest;
import com.zhong.app.reviews.dto.ReviewResponse;
import com.zhong.app.reviews.dto.ReviewSpecification;

@Service
public class ReviewService {
  private final ReviewRepository reviewRepository;
  private final UserRepository userRepository; 
  private final BookRepository bookRepository;


  public ReviewService(ReviewRepository reviewRepository, UserRepository userRepository,
      BookRepository bookRepository) {
    this.reviewRepository = reviewRepository;
    this.userRepository = userRepository;
    this.bookRepository = bookRepository;
  }

  public Page<ReviewResponse> getReviews(Integer bookId, int page, int size) {
    PageRequest pageable = PageRequest.of(page, size); 

    Specification<Review> spec = Specification
      .where(ReviewSpecification.hasBookId(bookId));
    Page<Review> reviews = reviewRepository.findAll(spec, pageable);
    return reviews.map(review -> setReviewResponseData(review));
  }

  public ReviewResponse addReview(Integer userId, CreateReviewRequest req) {
    //user, book, rating, content, update
    User user = userRepository.getReferenceById(userId);
    Book book = bookRepository.getReferenceById(req.getBookId());

    Review review = new Review(); 
    review.setUser(user); 
    review.setBook(book);
    review.setRating(req.getRating());
    review.setContent(req.getContent());

    Review newReview = reviewRepository.save(review);

    return setReviewResponseData(newReview);
  }

  public ReviewResponse updateReview(Integer id, UpdateReviewRequest req) {
    Review review = reviewRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("Review not found"));
    review.setContent(req.getContent());
    review.setRating(req.getRating());

    Review updatedReview = reviewRepository.save(review);
    return setReviewResponseData(updatedReview);
  }

  public void deleteReview(Integer id) {
    Review review = reviewRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("Review not found"));
    reviewRepository.deleteById(review.getId());
  }
  
  public ReviewResponse setReviewResponseData(Review review) {
    ReviewResponse response = new ReviewResponse();
    response.setId(review.getId());
    response.setUser(review.getUser());
    response.setBook(review.getBook());
    response.setRating(review.getRating());
    response.setContent(review.getContent());
    response.setUpdatedAt(review.getUpdatedAt());

    return response;
  } 
}
