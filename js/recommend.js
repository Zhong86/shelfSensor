const recommendContainer = document.getElementById('recommended'); 

async function getTopBooks() {
  try {
    const api = `https://openlibrary.org/search.json?q=fiction&sort=rating&limit=5`;
    const response = await fetch(api);
    const topBooks = await response.json(); 
    console.log(topBooks); 

    if (topBooks.docs && topBooks.docs.length > 0) {
      displayBooks(topBooks.docs);
    } else {
      container.innerHTML = '<p class="text-muted">No books found.</p>';
    }
  } catch (error) {
    console.error('Failed to get Top books', error);
  }
}

function displayBooks(books) {
  recommendContainer.innerHtml = ''; 

  books.forEach(book => {
    const coverId = book.cover_i;
    const coverUrl = coverId 
      ?  `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
      : 'https://via.placeholder.com/128x192?text=No+Cover';

    const card = document.createElement('div'); 
    card.className= 'col mb-3'; 
    card.innerHTML = `
      <div class='box d-flex flex-column gap-3 h-100'>
      <img src="${coverUrl}" class='card-img-top' alt="${book.title}" 
    style="height: 400px; object-fit: cover;
    border:4px solid var(--header); border-radius:8px"
      >
      <div class=''>
      <h4 style="text-align:center; font-weight:bold;">${book.title}</h4>
      </div>
      </div>
      `; 

    recommendContainer.appendChild(card); 
  });
}

getTopBooks(); 
