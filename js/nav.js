const pages = ['login', 'profile', 'isbn', 'yourBooks'];

function navigate(path) {
  window.location.href = pages.includes(path)
    ? `/pages/${path}Page.php` 
    : '/index.php'; 
}
