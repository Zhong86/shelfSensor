const genres = [
  'Fiction', 'Non-Fiction', 'Fantasy', 'Science Fiction',
  'Mystery', 'Romance', 'Thriller', 'Biography'
];

const container = document.getElementById('genreItems'); 
const button = document.getElementById('genreFilterButton'); 

genres.forEach(genre => {
  const a = document.createElement('a'); 
  a.className = 'dropdown-item';
  a.href = '#'; 
  a.textContent = genre; 

  a.addEventListener('click', (e) => {
    e.preventDefault(); 
    button.textContent = genre; 
  }); 

  container.appendChild(a); 
});
