const pages = ['recommend', 'account', 'isbn', 'collections'];

async function navigate(path) {
  let page = pages.includes(path) && path !== 'recommend'
    ? `/pages/${path}Page.php` 
    : '/index.php'; 
  
  if (path === 'account') {
    try {
      const response = await fetch('/api/auth/checkSession.php'); 
      const data = await response.json(); 

      if (data.loggedIn) {
        page = '/pages/profilePage.php'; 
      } else {
        page = '/pages/loginPage.php';
      }
    } catch (error) {
      console.error('Session check failed: ', error); 
      page = '/index.php'; 
    }
  }

  window.location.href = page; 
}

document.addEventListener('DOMContentLoaded', () => {
  const recommendBtn = document.getElementById('recommendNav'); 
  const collectionBtn = document.getElementById('collectionsNav'); 
  const accBtn = document.getElementById('accountNav'); 
  const scannerBtn = document.getElementById('scanNav'); 
  
  recommendBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    navigate('recommend'); 
  }); 
  accBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    navigate('account'); 
  }); 
  collectionBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    navigate('collections'); 
  }); 
  scannerBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    navigate('isbn'); 
  }); 
}); 
