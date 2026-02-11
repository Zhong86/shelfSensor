<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <link rel="stylesheet" href="../styles.css">
    <title>Collections Page</title>
  </head>
  <body>
    <?php include '../components/header.php'; ?>

    <!-- BODY -->
    <div class='box p-3'>
      <h1>Your Collection</h1>
      <!-- SEARCH BAR -->
      <div class='input-group my-4' style="width: 90%; height:50px;margin:auto" >
        <input type="text" name="search" class='form-control' placeholder='Search your favorite books!' style='background-color:white'>
        <button class='btn btn-secondary dropdown-toggle' id='genreFilterButton' data-bs-toggle='dropdown'>
          Genres
        </button>
        <div class='dropdown-menu overflow-scroll' id='genreItems' style='height:250px;' ></div>
        <button class='btn btn-secondary' type='button'>Search</button>
      </div>
      <div id='userCollections'></div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
    <script src='/js/nav.js'></script>
    <script src='/js/genreFilter.js;'></script>
  </body>
</html>
