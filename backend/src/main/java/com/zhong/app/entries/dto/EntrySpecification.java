package com.zhong.app.entries.dto;

import org.springframework.data.jpa.domain.Specification;

import com.zhong.app.entries.UserBookEntry;

public class EntrySpecification {
  public static Specification<UserBookEntry> hasUserId(Integer userId) {
    return (root, query, cb) -> cb.equal(root.get("id").get("userId"), userId);
  }

  public static Specification<UserBookEntry> hasStatus(UserBookEntry.ReadingStatus status) {
    return (root, query, cb) -> cb.equal(root.get("status"), status);
  }

  public static Specification<UserBookEntry> isFavorite(Boolean favorite) {
    return (root, query, cb) -> cb.equal(root.get("favorite"), favorite);
  }

  public static Specification<UserBookEntry> hasGenre(String genre) {
    return (root, query, cb) -> cb.equal(root.join("book").join("genres").get("name"), genre);
  }
}
