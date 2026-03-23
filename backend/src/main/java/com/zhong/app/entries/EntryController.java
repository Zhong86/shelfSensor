package com.zhong.app.entries;

import java.util.List;

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

import com.zhong.app.entries.dto.CreateUpdateEntryRequest;
import com.zhong.app.entries.dto.EntryResponse;

@RestController
@RequestMapping("/api/v1/entries")
public class EntryController {
  private final EntryService entryService;

  public EntryController(EntryService entryService) {
    this.entryService = entryService;
  } 

  @GetMapping()
  public ResponseEntity<Page<EntryResponse>> GetEntries(
    @RequestParam(defaultValue = "0") int page, 
    @RequestParam(defaultValue = "5") int size, 
    @RequestParam(required = false) String title,
    @RequestParam(required = false) String status, 
    @RequestParam(required = false) Boolean favorite, 
    @RequestParam(required = false) String genre
  ) {
    int userId = getUserId();
 
    return ResponseEntity.ok(entryService.getEntries(
      userId, page, size, title, status, favorite, genre
    ));
  }

  @GetMapping("/ids")
  public ResponseEntity<List<Integer>> GetSavedBookIds() {
    int userId = getUserId();
    return ResponseEntity.ok(entryService.getSavedBookIds(userId));
  }

  @GetMapping("/{bookId}")
  public ResponseEntity<EntryResponse> GetEntry(
    @PathVariable int bookId
  ) {
    int userId = getUserId();
    EntryResponse entry = entryService.getEntryByBookId(userId, bookId);
    return ResponseEntity.ok(entry);
  }

  @PostMapping()
  public ResponseEntity<EntryResponse> AddEntry(@RequestBody CreateUpdateEntryRequest entry) {
    int userId = getUserId();
    EntryResponse newEntry = entryService.addEntry(userId, entry);
    return ResponseEntity.ok(newEntry);
  }

  @PutMapping()
  public ResponseEntity<EntryResponse> UpdateEntry(
    @RequestBody CreateUpdateEntryRequest req
  ) {
    int userId = getUserId();
    EntryResponse updatedEntry = entryService.updateEntry(userId, req);

    return ResponseEntity.ok(updatedEntry);
  }

  @DeleteMapping("/{bookId}")
  public ResponseEntity<Void> DeleteEntry(@PathVariable int bookId) {
    int userId = getUserId();
    entryService.deleteEntry(userId, bookId);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }

  private int getUserId() {
    return (int) SecurityContextHolder.getContext()
    .getAuthentication().getDetails();
  }
}
