const searchPhone = () => {
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  console.log(searchText);
  //! clear search field.
  searchField.value = ''

  // ! condition for search feild
  if( searchText == ''){
    alert('Write Something To See Something!')
  };
  // ! working on api ,
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
  .then(res => res.json())
  .then(data => displaySearchResult(data.data.slice(0,20)) );
  // ! loading speaner
  loadingSpinner('block')

}

// ! function for show loading when something search.
const loadingSpinner = style => {
  document.getElementById('loading').style.display = style
}

// ! function for display search result into ui
const displaySearchResult = phones => {
  // console.log(phones.slice(0,20));
  const phonesContainer = document.getElementById('phones');
  phonesContainer.textContent = ''
  phones.map( phone => {
    // console.log(phone);
    //! creating new element to show search result in the html page.
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
    <div class="card h-100 border-0 rounded-3 shadow-lg ">
    <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
    <div class="card-body text-center ">
      <h4 class="card-title fw-bold "> Model: ${phone.phone_name}</h4>
      <h5 class="card-title text-primary "> Brand: ${phone.brand}</h5>
      <button class="btn btn-outline-primary mt-3 "> More Details </button>
    </div>
  </div>
    `;
    phonesContainer.appendChild(div)
    loadingSpinner('none')

  })

}