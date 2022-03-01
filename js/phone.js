const searchPhone = () => {
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  console.log(searchText);
  //! clear search field.
  searchField.value = ''

  // ! condition for search feild
  if( searchText == ''){
    alert('Write Something To See Something!')
  }
  
}