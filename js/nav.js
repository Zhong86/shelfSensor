const pages = ['login', 'profile', 'isbn', 'collections'];

function navigate(path) {
  window.location.href = pages.includes(path)
    ? `/pages/${path}Page.php` 
    : '/index.php'; 
}
