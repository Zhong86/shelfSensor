package com.zhong.app.books;

import org.springframework.data.jpa.domain.Specification;

public class BookSpecification {
  public static Specification<Book> hasAuthor(String author) {
    return (root, query, cb) -> cb.like(cb.lower(root.join("authors").get("name")), "%" + author.toLowerCase() + "%");
  }

  public static Specification<Book> hasGenre(String genre) {
    return (root, query, cb) -> cb.equal(cb.lower(root.join("genres").get("name")), genre.toLowerCase());
  }
}
