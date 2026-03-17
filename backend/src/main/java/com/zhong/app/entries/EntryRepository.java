package com.zhong.app.entries;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EntryRepository extends JpaRepository<UserBookEntry, UserBookId>, JpaSpecificationExecutor<UserBookEntry>{
  Optional<Page<UserBookEntry>> findByUserId(int userId, Pageable page);

  @Query(value="SELECT * FROM user_books WHERE user_id = :userId AND book_id = :bookId", 
    nativeQuery = true)
  Optional<UserBookEntry> findByBookId(
    @Param("userId") int userId, 
    @Param("bookId") int bookId
  );

  @Query(value="SELECT * FROM user_books WHERE user_id = :userId AND favorite = true", 
    nativeQuery = true)
  Optional<List<UserBookEntry>> findFavoritesByUserId(@Param("userId") int userId);

  @Query(value="SELECT * FROM user_books WHERE user_id = :userId AND status = :status", 
    nativeQuery = true)
  Optional<List<UserBookEntry>> findStatusByUserId(
    @Param("userid") int userId, 
    @Param("status") String status
  );
}
