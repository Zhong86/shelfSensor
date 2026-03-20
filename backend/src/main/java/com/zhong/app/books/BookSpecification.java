package com.zhong.app.books;

import org.springframework.data.jpa.domain.Specification;

public class BookSpecification {
  public static Specification<Book> hasAuthor(String author) {
    return (root, query, cb) -> {
      query.distinct(true);
      return cb.like(
        cb.lower(root.join("authors").get("name")), 
        "%" + author.toLowerCase() + "%"
      );
    };
  }

  public static Specification<Book> hasGenre(String genre) {
    return (root, query, cb) -> {
      query.distinct(true);
      return cb.equal(
        cb.lower(root.join("genres").get("name")), 
        genre.toLowerCase()
      );
    };
  }

  public static Specification<Book> hasTitle(String title) {
    return (root, query, cb) -> cb.like(
      cb.lower(root.get("title")), 
      "%" + title.toLowerCase() + "%"
    );
  }
}
