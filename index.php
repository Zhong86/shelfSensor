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
      <!-- SEARCH BAR -->
      <div class='input-group my-4' style="width: 90%; height:50px;margin:auto" >
        <input type="text" name="search" class='form-control' placeholder='Search your favorite books!' style='background-color:white'>
        <button class='btn btn-secondary dropdown-toggle' id='genreFilterButton' data-bs-toggle='dropdown'>
          Genres
        </button>
        <div class='dropdown-menu overflow-scroll' id='genreItems' style='height:250px;' ></div>
        <button class='btn btn-secondary' type='button'>Search</button>
      </div>

      <div id='loadingSpinner' class='d-none text-center py-5'>
        <div class="spinner-border text-secondary" role="status" style="width: 3rem; height: 3rem;">
          <span class="visually-hidden">Retrieving books...</span>
        </div>
        <p class="mt-3 mb-0">Loading books from OpenLibrary...</p>
      </div>
      <div class='row gx-3 mt-4' id='recommended'></div>
    </div>

    <!-- ADD BOOK INPUT -->
    <div class ='card bg-white input-add-book rounded shadow-lg' id='addBookContainer'>
    </div>

    <script type='module' src='./js/recommend.js'></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
    <script src='/js/nav.js'></script>
    <script src="/js/genreFilter.js"></script>
  </body>
</html>
