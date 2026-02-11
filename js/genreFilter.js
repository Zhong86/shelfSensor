const genres = [
  'Fiction', 'Non-Fiction', 'Fantasy', 'Science Fiction',
  'Mystery', 'Romance', 'Thriller', 'Biography'
];

const container = document.getElementById('genreItems'); 
const button = document.getElementById('genreFilterButton'); 

async function genreList() {
  const response = await fetch('/api/collection/getGenres.php');
  const result = await response.json();

  result.genres.forEach(genre => {
    const a = document.createElement('a'); 
    a.className = 'dropdown-item';
    a.href = '#'; 
    a.textContent = genre.name; 

    a.addEventListener('click', (e) => {
      e.preventDefault(); 

      button.textContent = genre.name; 
    }); 

    container.appendChild(a); 
  });
}

document.addEventListener('DOMContentLoaded', () => {
  genreList();
}); 
