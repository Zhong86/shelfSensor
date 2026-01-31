<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
  <link rel="stylesheet" href="../styles.css">
  <title>Login Page</title>
</head>
<body>
  <?php include '../components/header.php'; ?>
  <!-- BODY -->
  <div class='row mt-5 px-5 w-100' id='accountForm'></div>

  <!-- TEMPLATES FOR LOGIN & REGISTER -->
  <template id='loginTemplate'>
    <div class='col-5 d-flex flex-column justify-content-center' >
      <h1 style='text-align:center; font-size:4rem;'>Login</h1>
      <h4 class='toggle-link' data-target='register' style='text-align:center;'>or Register?</h4>
    </div>

    <div class='col p-5' style='border: 2px solid var(--header);border-radius:24px;'>
      <form id='loginForm' style='font-size:24px;'>
        <div class='form-group mb-5 '>
          <label for="username">Username</label>
          <input type="text" id='username' name="username" class='form-control' placeholder='Input your username...' required>
        </div>
        <div class='form-group mb-4'>
          <label for="password">Password</label>
          <input type="text" id='password' name="password" class='form-control' placeholder='Input your password...' required>
        </div>
        <div class='d-flex justify-content-center mb-4'>
          <button type="submit" class='btn btn-primary' style='font-size:24px;'>Login</button>
        </div>
      </form>
      <hr style='border: 2px solid'>
    </div>
  </template>


  <template id='registerTemplate'>
    <div class='col-5 d-flex flex-column justify-content-center' >
      <h1 style='text-align:center; font-size:4rem;'>Register</h1>
      <h4 class='toggle-link' data-target='login' style='text-align:center;'>or Login?</h4>
    </div>

    <div class='col p-5' style='border: 2px solid var(--header);border-radius:24px;'>
      <form id='registerForm' style='font-size:24px;'>
        <div class='form-group mb-5 '>
          <label for="username">New Username</label>
          <input type="text" id='username' name="username" class='form-control' placeholder='Input a new username...' required>
        </div>
        <div class='form-group mb-4'>
          <label for="password">Password</label>
          <input type="text" id='password' name="password" class='form-control' placeholder='Input a password...' required>
        </div>
        <div class='d-flex justify-content-center mb-4'>
          <button type="submit" class='btn btn-primary' style='font-size:24px;'>Register</button>
        </div>
      </form>
      <hr style='border: 2px solid'>
    </div>
  </template>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
<script src='../js/nav.js'></script>
<script src="../js/genreFilter.js"></script>
<script src='../js/login.js'></script>
</body>
</html>
