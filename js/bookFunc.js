export async function addBook(key, data) {
  const bookFetch = await fetch(`https://openlibrary.org${key}.json`);
  const book = await bookFetch.json(); 
  console.log(book); 

  const response = await fetch('/api/collection/addCollection.php', {
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' }, 
    body: { book: JSON.stringify(book) }
  });

  const result = await response.json(); 
  if(result.success)
    alert(`Added "${book.title}" to your collection`);
  else 
    alert(`Failed to add "${book.title}" to your collection `);
}
