import { addBook } from './bookFunc.js';

const recommendContainer = document.getElementById('recommended'); 
const loading = document.getElementById('loadingSpinner');

async function getTopBooks() {
  loading.classList.remove('d-none'); 
  recommendContainer.innerHTML = ''; 

  try {
    const api = `https://openlibrary.org/search.json?q=fiction&sort=rating&limit=5`;
    const response = await fetch(api);
    const topBooks = await response.json(); 
    console.log(topBooks); 

    loading.classList.add('d-none');

    if (topBooks.docs && topBooks.docs.length > 0) {
      displayBooks(topBooks.docs);
    } else {
      recommendContainer.innerHTML = '<p class="text-muted">No books found.</p>';
    }
  } catch (error) {
    console.error('Failed to get Top books', error);
  }
}

function displayBooks(books) {
  recommendContainer.innerHTML = ''; 

  books.forEach(book => {
    const coverId = book.cover_i;
    const coverUrl = coverId 
      ?  `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
      : 'https://via.placeholder.com/128x192?text=No+Cover';

    const card = document.createElement('div'); 
    card.className= 'col-4 mb-3'; 
    card.innerHTML = `
<div class='card d-flex h-100'>
  <img src="${coverUrl}" class='card-img-top' alt="${book.title}" 
    style="height: 550px; object-fit: cover;"
  >
  <div class='card-body d-flex justify-content-between'>
    <div class='col-9 d-flex flex-column'>
      <h4 style="font-weight:bold;">${book.title}</h4>
      <p style="font-weight:bold;">${book.author_name[0]}</p>
    </div>
    <div class='col d-flex justify-content-center align-items-center'>
      <button type='submit' class='button card-btn add-book' data-key='${book.key}' data-title='${book.title}'>+</button>
    </div>
  </div>
</div>
`; 
    recommendContainer.appendChild(card); 
  });
}

function showAddInput(key, title) {
  const inputContainer = document.getElementById('addBookContainer');
  if(!inputContainer) return; 
  inputContainer.innerHTML = `
<div class='card-header'>
  <h4 style='text-align:center'>${title}</h4>

</div>
`; 
  inputContainer.style.display = 'block';

}

recommendContainer.addEventListener('click', (e) => {
  if(e.target.classList.contains('add-book')) {
    const title = e.target.dataset.title;
    const key = e.target.dataset.key;

    showAddInput(key, title);
  }
}); 

getTopBooks(); 
