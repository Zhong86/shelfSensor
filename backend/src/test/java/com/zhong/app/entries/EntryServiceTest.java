package com.zhong.app.entries;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.when;
import static org.mockito.Mockito.any;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.zhong.app.books.Book;
import com.zhong.app.books.BookRepository;
import com.zhong.app.entries.dto.CreateUpdateEntryRequest;
import com.zhong.app.entries.dto.EntryResponse;
import com.zhong.app.users.User;
import com.zhong.app.users.UserRepository;

@ExtendWith(MockitoExtension.class)
class EntryServiceTest {
  @Mock EntryRepository entryRepository; 
  @Mock UserRepository userRepository; 
  @Mock BookRepository bookRepository; 
  @InjectMocks EntryService entryService; 

  @Test
  void addEntry_validRequest_returnsEntry() {
    User user = new User("Alice", "alice@gmail.com", "pass"); 
    Book book = new Book("Dune", "978-0441013593", 1965, "Sci-fi epic", List.of(), List.of());

    when(userRepository.getReferenceById(1)).thenReturn(user);
    when(bookRepository.getReferenceById(2)).thenReturn(book);

    CreateUpdateEntryRequest req = new CreateUpdateEntryRequest();
    req.setBookId(2);
    req.setStatus("READING");
    req.setFavorite(false);
    req.setNotes("Great so far");

    UserBookEntry savedEntry = new UserBookEntry(user, book, UserBookEntry.ReadingStatus.READING, "Great so far");
    when(entryRepository.save(any())).thenReturn(savedEntry);

    EntryResponse result = entryService.addEntry(1, req);

    assertThat(result.getStatus()).isEqualTo("READING");
    assertThat(result.getBook()).isEqualTo(book);
  }
}
