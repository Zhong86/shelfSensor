<!-- HEADER -->
<div class='box header d-flex gap-5 p-3'>
  <div class=''>
    <header class='mb-2'>shelfSensor</header>
    <div class='input-group ' style="width: 600px" >
      <input type="text" name="search" class='form-control' placeholder='Search your favorite books!' style='background-color:var(--primary)'>
      <button class='btn btn-secondary dropdown-toggle' id='genreFilterButton' data-bs-toggle='dropdown'>
        Genres
      </button>
      <div class='dropdown-menu' id='genreItems' ></div>
      <button class='btn btn-secondary' type='button'>Search</button>
    </div>
  </div>
  <div class='navBar'>
    <button onclick="navigate('recommend')">RECOMMENDED</button>
    <button onclick="navigate('login')">LOGIN</button>
  </div>
</div> 

