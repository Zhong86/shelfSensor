<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <link rel="stylesheet" href="styles.css">
    <title>Book Manager</title>
  </head>
  <body>
    <?php include './components/header.php'; ?>
    
    <!-- BODY -->
    <div class='hero'>
      <span style='font-size:3rem;text-align:center;z-index:2'>Discover your favorite books</span>
    </div>
    <div class='box p-3'>
      <h1 style='color:var(--tertiary)'>Recommended For You</h1>
      <div id='loadingSpinner' class='d-none text-center py-5'>
        <div class="spinner-border text-secondary" role="status" style="width: 3rem; height: 3rem;">
          <span class="visually-hidden">Retrieving books...</span>
        </div>
        <p class="mt-3 mb-0">Loading books from OpenLibrary...</p>
      </div>
      <div class='row gx-3 mt-4' id='recommended'></div>
    </div>
    <script src='./js/recommend.js'></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
    <script src='/js/nav.js'></script>
    <script src="/js/genreFilter.js"></script>
  </body>
</html>
