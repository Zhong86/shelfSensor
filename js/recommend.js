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
<div style='width:85%'>
  <p style='text-align:center;font-weight:bold;font-size:2rem'>${title}</p>
  <hr style='border-2 border-secondary w-75 mx-auto my-4'>
  <form id='addBookForm' style='font-size:1rem;' data-status=''>
    <div class='d-flex mb-3 align-items-center justify-content-between'>
      <span>Status</span>
      <div class='dropdown'>
        <button class='btn brown-btn w-100' data-bs-toggle='dropdown'>
          Status
        </button>
        <ul id='statusDropdown' class='dropdown-menu'>
          <li ><a class='dropdown-item' data-status='reading' href='#'>Reading</a></li>
          <li ><a class='dropdown-item' data-status='to_read' href='#'>Read later</a></li>
          <li ><a class='dropdown-item' data-status='completed' href='#'>Finished Reading</a></li>
        </ul>
      </div>
    </div>
    <div class='form-group mb-4'>
      <label for='notes'>Notes</label>
      <textarea class='form-control mt-1' id='notes' name='notes' rows='5' placeholder='Start adding notes for this book! '></textarea>
    </div>
    <div class='d-flex justify-content-center'>
      <button class='btn brown-btn w-50'>Add Book</button>
    </div>
  </form>
</div>
`; 

  inputContainer.style.display = 'flex';
  inputContainer.addEventListener('click', (e) => {
    if(e.target.classList.contains('dropdown-item')) {
      e.preventDefault();
      const status = e.target.dataset.status;
      e.target.closest('.dropdown').querySelector('button').textContent = e.target.textContent;
      document.querySelector('#addBookForm').dataset.status = status;
    }
  }); 

  document.getElementById('addBookForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = e.currentTarget.dataset.status;
    const notes = document.getElementById('notes').value;

    await addBook(key, {status, notes});
    
    inputContainer.style.display = 'none';
  }); 
}

recommendContainer.addEventListener('click', async (e) => {
  if(e.target.classList.contains('add-book')) {
    const title = e.target.dataset.title;
    const key = e.target.dataset.key;
    
    const response = await fetch('/api/auth/checkSession.php');
    const user = await response.json();
    if(user.loggedIn) { 
      showAddInput(key, title); 
    }
    else alert('Log in to add books to your collection');
  }
}); 

getTopBooks(); 
