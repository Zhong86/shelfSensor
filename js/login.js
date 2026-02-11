function switchForm(formType) {
  const loginTemplate = document.getElementById('loginTemplate'); 
  const registerTemplate = document.getElementById('registerTemplate'); 
  const accContainer = document.getElementById('accountForm'); 

  if (!accContainer) return; 

  accContainer.innerHTML = ''; 
  let height;

  if (formType === 'login') {
    height = '650px';
    const loginContent = loginTemplate.content.cloneNode(true); 
    accContainer.appendChild(loginContent); 
    attachLoginHandler(); 
  } else if (formType === 'register') {
    height = '700px';
    const regisContent = registerTemplate.content.cloneNode(true); 
    accContainer.appendChild(regisContent); 
    attachRegisHandler(); 
  }

  accContainer.style.height = height;
}

function attachLoginHandler() {
  const loginForm = document.getElementById('loginForm');

  if (!loginForm) return; 
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const username = document.getElementById('username').value; 
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('/api/auth/login.php', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({ username, password })
      }); 

      const result = await response.json(); 

      if (result.success) {
        alert('Login successful'); 

        //SAVE LOGIN thing 
        window.location.href = '../index.html'; 
      } else {
        alert('Login failed: ' + (result.message || 'Invalid credentials')); 
      }
    } catch (error) {
      console.error('Login error:', error); 
      alert('An error occured during login'); 
    }
  }); 
}

function attachRegisHandler() {
  const regisForm = document.getElementById('registerForm');
  if (!regisForm) return; 

  populateGenreOptions(); 

  regisForm.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const username = document.getElementById('username').value; 
    const password = document.getElementById('password').value;
    const genres = Array.from(document.querySelectorAll('.genre-checkbox:checked')).map(cb => cb.value);

    if(genres.length === 0) {
      alert('Please select at least 1 genre'); 
      return; 
    }

    try {
      const response = await fetch('/api/auth/register.php', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({ username, password, genres })
      }); 

      const result = await response.json(); 

      if (result.success) {
        alert('Registered user'); 
        window.location.href = '../index.html'; 
      } else {
        alert('Registration failed: ' + (result.message || 'Invalid credentials')); 
      }
    } catch (error) {
      console.error('Registration error:', error); 
      alert('An error occured during registration'); 
    }
  }); 
}

async function populateGenreOptions() {
  const response = await fetch('/api/collection/getGenres.php');
  const result= await response.json(); 
  console.log(result); 

  const genreCheckboxes = document.getElementById('genreCheckboxes');
  if(!genreCheckboxes) return;
  genreCheckboxes.innerHTML = '';

  result.genres.forEach(genre => {
    const item = document.createElement('div'); 
    item.className = 'dropdown-item'; 
    item.innerHTML = `
      <div class='form-check'>
        <input class='form-check-input genre-checkbox' type='checkbox' value="${genre.name}" id="genre-${genre.id}">
        <label class='form-check-label' for="genre-${genre.id}">
          ${genre.name}
        </label>
      </div>
    `;

    item.addEventListener('click', (e) => {
      e.stopPropagation(); 
    }); 

    genreCheckboxes.appendChild(item); 
  });

}

document.addEventListener('DOMContentLoaded', () => {
  const accForm  = document.getElementById('accountForm'); 
  if (!accForm) return; 

  accForm.addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle-link')) {
      e.preventDefault(); 
      const target = e.target.dataset.target; 
      switchForm(target); 
    }
  }); 
  switchForm('login'); 
}); 

