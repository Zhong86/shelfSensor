function switchForm(formType) {
  const loginTemplate = document.getElementById('loginTemplate'); 
  const registerTemplate = document.getElementById('registerTemplate'); 
  const accContainer = document.getElementById('accountForm'); 

  if (!accContainer) return; 

  accContainer.innerHTML = ''; 

  if (formType === 'login') {
    const loginContent = loginTemplate.content.cloneNode(true); 
    accContainer.appendChild(loginContent); 
    attachLoginHandler(); 
  } else if (formType === 'register') {
    const regisContent = registerTemplate.content.cloneNode(true); 
    accContainer.appendChild(regisContent); 
    attachRegisHandler(); 
  }
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

  regisForm.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const username = document.getElementById('username').value; 
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('/api/auth/register.php', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({ username, password })
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

