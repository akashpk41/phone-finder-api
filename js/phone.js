const searchPhone = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  //! clear search field.
  searchField.value = "";
  // ! condition for search feild
  if (searchText == "") {
    alert("Write Something To See Something!");
  }
  // ! working on api ,
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySearchResult(data.data.slice(0, 20)));
  // ! loading speaner
  loadingSpinner("block");
};

// ! function for show loading when something search.
const loadingSpinner = (style) => {
  document.getElementById("loading").style.display = style;
};

// ! function for display search result into ui
const displaySearchResult = (phones) => {
  // ! add one condition, if no phone found.
  if (phones.length == []) {
    document.getElementById("not-available").style.display = "block";
    loadingSpinner("none");
  }
  const phonesContainer = document.getElementById("phones");
  phonesContainer.textContent = "";
  phones.map((phone) => {
    // console.log(phone);
    //! creating new element to show search result in the html page.
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card h-100 border-0 rounded-3 shadow-lg ">
    <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
    <div class="card-body text-center ">
      <h4 class="card-title fw-bold "> Model: ${phone.phone_name}</h4>
      <h5 class="card-title text-primary "> Brand: ${phone.brand}</h5>
      <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-outline-primary mt-3 "> More Details </button>
    </div>
  </div>
    `;
    phonesContainer.appendChild(div);
    // ! hide spinner when search result show
    loadingSpinner("none");
    document.getElementById("not-available").style.display = "none";
  });
};

// ! function for load  phone details from api
const loadPhoneDetails = (phoneId) => {
  // console.log(phoneId);
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showPhoneDetails(data.data));
};


// ! function for show phone details
const showPhoneDetails = (phoneDetails) => {
  const phoneDetailsContainer = document.getElementById("phone-details");
  // ! clear previous details
  phoneDetailsContainer.textContent = "";
  //! creating new element for show phone details in html page
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
  <img src="${phoneDetails.image}" class="card-img-top" alt="..." />
  <div class="card-body text-center">
    <h3 class="card-title fw-bold">${phoneDetails.name}</h3>
    <h4 class="card-title text-primary">${phoneDetails.brand}</h4>
    <p class="card-title fw-bold ">Release Date: ${
      phoneDetails.releaseDate
        ? phoneDetails.releaseDate
        : "No released date found."
    } </p>

    <!-- ! main features -->
    <ul class="list-group">
      <li class="list-group-item active" aria-current="true">
        Main Features
      </li>
      <li class="list-group-item text-start">
        <span class="fw-bold">Storage:</span> ${
          phoneDetails.mainFeatures.storage
        }",
      </li>
      <li class="list-group-item list-group-item-dark text-start">
        <span class="fw-bold">Display Size:</span> ${
          phoneDetails.mainFeatures.displaySize
        }
      </li>
      <li class="list-group-item text-start">
        <span class="fw-bold">Chip Set:</span> ${
          phoneDetails.mainFeatures.chipSet
        }
      </li>
      <li class="list-group-item list-group-item-dark text-start">
        <span class="fw-bold">Memory:</span> ${phoneDetails.mainFeatures.memory}
      </li>
    </ul>

    <!-- ! phone sensors area -->
    <div
      class=" bg-info my-3 p-2 rounded-3"
    >
    <h5 class="fw-bold text-center ">Sensors</h5>
      <p>
    ${phoneDetails.mainFeatures.sensors}
      </p>
    </div>

    <!-- ! others features -->
    <ul class="list-group">
      <li class="list-group-item active" aria-current="true">
        Others Features
      </li>
      <li class="list-group-item text-start">
        <span class="fw-bold">WLAN:</span>
        ${phoneDetails.others.WLAN}
      </li>
      <li class="list-group-item list-group-item-dark text-start">
        <span class="fw-bold">Bluetooth:</span> ${phoneDetails.others.Bluetooth}
      </li>
      <li class="list-group-item text-start">
        <span class="fw-bold">GPS:</span> ${phoneDetails.others.GPS}
      </li>
      <li class="list-group-item list-group-item-dark text-start">
        <span class="fw-bold">NFC:</span> ${phoneDetails.others.NFC}
      </li>
      <li class="list-group-item text-start">
        <span class="fw-bold">Radio:</span> ${phoneDetails.others.Radio}
      </li>
      <li class="list-group-item list-group-item-dark text-start">
        <span class="fw-bold">USB:</span> ${phoneDetails.others.USB}
      </li>
    </ul>
  </div>
  `;
  phoneDetailsContainer.appendChild(div);
};
