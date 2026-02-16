<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="../styles.css">
    <title>Login Page</title>
  </head>
  <body>
    <?php include '../components/header.php'; ?>
    <!-- BODY -->
    <div class='container loginCard shadow p-3 my-5' id='accountForm'></div>

    <?php include '../components/footer.php';?>

    <!-- TEMPLATES FOR LOGIN & REGISTER -->
    <template id='loginTemplate'>
      <p style='text-align:center; font-size:2rem; font-weight:bold'>Welcome Back</p>
      <p style='text-align:center; font-size:18px; font-weight:500;'>Log back in to see your collections</p>
      <div class='col px-4 mt-5' >
        <form id='loginForm' style='font-size:24px;'>
          <div class='form-group mb-4'>
            <div class='form-group mb-4'>
              <label for="username">Username</label>
              <input type="text" id='username' name="username" class='form-control acc-input mt-2' placeholder='Input your username...' required>
            </div>
          </div>

          <div class='form-group mb-4'>
            <label for="password">Password</label>
            <input type="text" id='password' name="password" class='form-control acc-input mt-2' placeholder='Input your password...' required>
          </div>
          <div class='d-flex justify-content-center mb-4'>
            <button type="submit" class='btn brown-btn w-100' style='font-size:1.5rem;'>Log In</button>
          </div>
        </form>
        <hr style='border: 2px solid var(--tertiary)'>
        <button class='btn google-btn w-100 my-3'>Google</button>
        <div class='d-flex justify-content-center'>
          <button class='btn btn-link toggle-link' data-target='register' style='font-size:1rem;'>Don't have an account yet? Register</button>
        </div>
      </div>
    </template>


    <template id='registerTemplate'>
      <p style='text-align:center; font-size:2rem; font-weight:bold'>Welcome</p>
      <p style='text-align:center; font-size:18px; font-weight:500;'>Join to monitor your favorite books</p>
      <div class='col px-4 mt-5' >
        <form id='registerForm' style='font-size:24px;'>
          <div class='form-group mb-4'>
            <div class='form-group mb-4'>
              <label for="username">Username</label>
              <input type="text" id='username' name="username" class='form-control acc-input mt-2' placeholder='Create a new username...' required>
            </div>
          </div>
          <div class='form-group mb-4'>
            <label for="password">Password</label>
            <input type="text" id='password' name="password" class='form-control acc-input mt-2' placeholder='Create a password...' required>
          </div>

          <div class='d-flex justify-content-between gap-3'>
            <span>Genres</span>
            <div class='dropdown mb-4 w-50'>
              <button class='btn brown-btn w-100' data-bs-toggle='dropdown'>
                Your favorite genres...
              </button>
              <div id='genreCheckboxes' class='dropdown-menu overflow-scroll w-100' style='height:200px'></div>
            </div>
          </div>

          <div class='d-flex justify-content-center mb-4'>
            <button type="submit" class='btn brown-btn w-100' style='font-size:1.5rem;'>Sign Up</button>
          </div>

        </form>
        <hr style='border: 2px solid var(--tertiary)'>
        <button class='btn google-btn w-100 my-3'>Google</button>

        <div class='d-flex justify-content-center'>
          <button class='btn btn-link toggle-link' data-target='login' style='font-size:1rem;'>Already have an account? Log In</button>
        </div>
    </template>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
    <script src='../js/nav.js'></script>
    <script src='../js/login.js'></script>
  </body>
</html>
