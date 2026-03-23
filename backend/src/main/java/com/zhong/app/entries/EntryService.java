package com.zhong.app.entries;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.zhong.app.books.Book;
import com.zhong.app.books.BookRepository;
import com.zhong.app.entries.dto.CreateUpdateEntryRequest;
import com.zhong.app.entries.dto.EntryResponse;
import com.zhong.app.entries.dto.EntrySpecification;
import com.zhong.app.users.User;
import com.zhong.app.users.UserRepository;

@Service
public class EntryService {
 private final EntryRepository entryRepository;
  private final UserRepository userRepository; 
  private final BookRepository bookRepository; 

  public List<Integer> getSavedBookIds(int userId) {
    return entryRepository.findBookIdsByUserId(userId);
  }

  public EntryService(EntryRepository entryRepository, BookRepository bookRepository, UserRepository userRepository) {
    this.entryRepository = entryRepository;
    this.userRepository = userRepository;
    this.bookRepository = bookRepository;
  } 

  public Page<EntryResponse> getEntries(int userId, int page, int size, String title, String status, Boolean favorite, String genre) {
    PageRequest pageable = PageRequest.of(page, size);
    
    //Filters for param
    Specification<UserBookEntry> spec = Specification
      .where(EntrySpecification.hasUserId(userId));
    
    if(title != null)
      spec = spec.and(EntrySpecification.hasTitle(title));
    if(status != null) 
      spec = spec.and(EntrySpecification.hasStatus(UserBookEntry.ReadingStatus.valueOf(status)));
    if(favorite != null) 
      spec = spec.and(EntrySpecification.isFavorite(favorite));
    if(genre != null) 
      spec = spec.and(EntrySpecification.hasGenre(genre));

    Page<UserBookEntry> entries = entryRepository.findAll(spec, pageable);
    return entries.map(entry -> setEntryResponseData(entry));
  }

  public EntryResponse getEntryByBookId(int userId, int bookId) {
    UserBookEntry entry = entryRepository.findByBookId(userId, bookId)
      .orElseThrow(() -> new RuntimeException("User or Book not found"));
    return setEntryResponseData(entry);
  }

  public EntryResponse addEntry(int userId, CreateUpdateEntryRequest req) {
    User user = userRepository.getReferenceById(userId);
    Book book = bookRepository.getReferenceById(req.getBookId());

    UserBookEntry entry = new UserBookEntry();
    entry.setUser(user); 
    entry.setBook(book);
    entry.setStatus(UserBookEntry.ReadingStatus.valueOf(req.getStatus().toUpperCase()));
    entry.setFavorite(req.getFavorite());
    entry.setNotes(req.getNotes());

    UserBookEntry saved = entryRepository.save(entry);

    return setEntryResponseData(saved);
  }

  public EntryResponse updateEntry(int userId, CreateUpdateEntryRequest req) {
    UserBookEntry entry = entryRepository.findByBookId(userId, req.getBookId())
    .orElseThrow(() -> new RuntimeException("User or Book not found"));
    entry.setStatus(UserBookEntry.ReadingStatus.valueOf(req.getStatus().toUpperCase()));
    entry.setFavorite(req.getFavorite());
    entry.setNotes(req.getNotes());

    UserBookEntry updated = entryRepository.save(entry);

    return setEntryResponseData(updated);
  }

  public void deleteEntry(int userId, int bookId) {
    UserBookEntry entry = entryRepository.findByBookId(userId, bookId)
    .orElseThrow(() -> new RuntimeException("User or Book not found"));

    entryRepository.deleteById(entry.getId());
  }

  private EntryResponse setEntryResponseData(UserBookEntry entry) {
    EntryResponse response = new EntryResponse();
    response.setBook(entry.getBook());
    response.setStatus(entry.getStatus().name());
    response.setFavorite(entry.getFavorite());
    response.setNotes(entry.getNotes());

    return response; 
  }

}
