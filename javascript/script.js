let body = document.getElementsByTagName("body");
let header = document.getElementsByTagName("header");
let logo = document.getElementById("logo");
let main_container = document.getElementById("main-container");
let card_section = document.getElementById("card-section");
let cards = document.getElementsByClassName("card");
let search_input = document.getElementById("search-input");
let filter_section = document.getElementById("filter-section");
let filter_dropdown = document.getElementById("filter-dropdown");
let theme_btn = document.getElementById("theme-btn");
let theme_bnt_text = document.getElementById("theme-btn-text");
let details_section_element = document.getElementById("details-section-element");

const BASE_URL = "https://restcountries.com";


// start DOM manipulation and data fetching when DOM has loaded 
window.addEventListener("load", async ()=>{
  initializeApp();// load and display data when app starts 
  searchCountry(search_input);
  filterCountriesByRegion(filter_dropdown);
  toggleTheme(theme_btn);
  reloadApp(logo);
})


//=============================================================================

// fetch and display data on initial load 
async function initializeApp(){
  let all_countries = await getCountry(BASE_URL+"/v3.1/all");
  displayCountryCards(all_countries);
}

// reloads the app and reset filter and search when the logo btn is clicked
async function reloadApp(btn){
  btn.addEventListener("click", async ()=>{
    initializeApp();
  })
}

// accepts a url and fetches data from API using the endpoint and return it
async function getCountry(url){
    try{
      let response = await fetch(url);

      if(!response.ok){
        throw new Error("Network problem");
      }

      let data = await response.json();
      return data;
    }
    catch(error){
      if(err){
        console.log(error);
      }
    }
};

//accepts a an array of countries and create bootstrap cards displying them to the DOM 
function displayCountryCards(data){
  // Delete existing cards from the DOM if there's any 
  while (card_section.firstChild) {
    card_section.removeChild(card_section.firstChild);
  }

  // create new cards from fetched countries
  data.forEach(ele => {
    // HTML card template 
    let card = `
    <div class="card shadow-sm border-0 mb-5" style="width: 18rem" id="${ele.name.common}">
        <div class="h-75">
            <img
            class="card-img-top w-100 h-100" 
            src="${ele.flags.png?ele.flags.svg:"./images/download.svg"}"
            alt="Card image cap"
            />
        </div>
        
        <div class="card-body py-4">
          <h5 class="card-title fw-bold">${ele.name.common}</h5>
          <div class="mt-4 mb-2">
            <span class="text-muted"><strong>Population: </strong>${ele.population}</span> <br />
            <span class="text-muted"><strong>Region: </strong>${ele.region}</span><br />
            <span class="text-muted"><strong>Capital: </strong>${ele.capital}</span><br />
          </div>
        </div>
    </div>`;

    //add new cards to DOM 
    card_section.insertAdjacentHTML("beforeend", card);
  });

  makeCardsClickable();
}

//accepts an html text input element, and diplay countries that match user input
function searchCountry(html_text_input){
  html_text_input.addEventListener("input", async ()=>{
    // user input 
    let country_to_search = search_input.value;
    let country = await getCountry(`https://restcountries.com/v3.1/name/${country_to_search}`);
   
    displayCountryCards(country);
  })
}

//accepts an html dropdown list of region and filter based on user selected option
function filterCountriesByRegion(html_dropdown_list){
  html_dropdown_list.addEventListener("click", async (e)=>{
     // user selected region 
     let selected_region = e.target.innerText;
     let country = await getCountry(`https://restcountries.com/v3.1/region/${selected_region}`);
     displayCountryCards(country);
  })
}

//change the UI of the application based on the selected theme (dark or light)
function toggleTheme(btn){

  btn.addEventListener("click", ()=>{
    
    //the value of theme btn indicating user selected text
    let user_selected_theme = theme_bnt_text.innerText;
    
    //toggle between light and dark mode
    if(user_selected_theme==="Dark Mode"){
      // remove light mode styling from elements
      body[0].classList.remove("body-background-light");
      header[0].classList.remove("bg-light");
      header[0].classList.remove("text-dark");
      theme_btn.classList.remove("text-dark");      
      

      // and change styling to match dark mode 
      body[0].classList.add("body-background-dark");
      header[0].classList.add("bg-dark");
      header[0].classList.add("text-light");
      theme_btn.classList.add("text-light");

      // change innerText of the theme button 
      theme_bnt_text.innerText = "Light Mode";

    }
    else if(user_selected_theme==="Light Mode"){
      // remove dark mode styling from elements 
      body[0].classList.remove("body-background-dark");
      header[0].classList.remove("bg-dark");
      header[0].classList.remove("text-light");
      theme_btn.classList.remove("text-light");

      // and add styling to match light mode 
      body[0].classList.add("body-background-light");
      header[0].classList.add("text-dark");
      theme_btn.classList.add("text-dark");

      // change inner text of the theme value 
      theme_bnt_text.innerText = "Dark Mode";
      
    }

  })

}

//display the details of the country for the card that user clicked
function displayCountryDetails(data){
  // hide current esisting element from the DOM 
  filter_section.classList.remove("d-flex");
  card_section.classList.remove("d-flex");
  filter_section.classList.add("d-none");
  card_section.classList.add("d-none");

  //remove duplicates of details section element during toggle between home page
  if(details_section_element !== null){
    details_section_element.remove();
  }


  // create and display new DOM elements with selected country details
  data.forEach(ele => {
    // HTML card template 
    let details_section = `
      <section id="details-section-element">
        <!-- back btn section  -->
        <section class="d-flex justify-content-between my-5">
          <!-- back btn  -->
          <div class=" mb-3 ">
            <button type="button" class="btn   btn-secondary btn-sm shadow-sm" id="back-btn">Take Me Back</button>
          </div>
        </section>

        <!-- details  -->
        <section class="d-flex  flex-wrap">
          <div class="w-50 bg-danger border">
            <img src="${ele.flags.svg}" alt="placeholder image" class="w-100 h-100">
          </div>
          <div class="m-4  d-flex flex-column justify-content-center">
            <h2 class="fs-1"><strong>${ele.name.common}</strong></h2>
            <div >
              <p class="m-0 text-muted"><strong>Capital:</strong> ${ele.capital}</p>
              <p class="m-0 text-muted"><strong>Population:</strong> ${ele.population}</p>
              <p class="m-0 text-muted"><strong>Continent:</strong> ${ele.continents}</p>
              <p class="m-0 text-muted"><strong>Region:</strong> ${ele.continents}</p>
              <p class="m-0 text-muted"><strong>Sub Region:</strong> ${ele.subregion}</p>
            </div>
          </div>
          
        </section>
      </section>    
    `;

    // hide current esisting element from the DOM 
    filter_section.classList.remove("d-flex");
    card_section.classList.remove("d-flex");
    filter_section.classList.add("d-none");
    filter_section.classList.add("d-none");

    //display details section to the DOM 
    main_container.insertAdjacentHTML("beforeend", details_section);

    // add event listener to back btn on country details page 
    returnToHomeScreen();
  });

}

//Allow country details to be displayed when a specific card is clicked
function makeCardsClickable(){
  for(let i=0; i<cards.length; i++){
    cards[i].addEventListener("click", async ()=>{
      let selected_card = cards[i];
      let selected_country = selected_card.id;
      let selected_country_details = await getCountry(BASE_URL+"/v3.1/name/"+selected_country);
      displayCountryDetails(selected_country_details);
    })
  }
}

//Allow user to be taken back to the home page when the back btn on the details page is clicked
function returnToHomeScreen(){
  let back_btn = document.getElementById("back-btn");
  details_section_element = document.getElementById("details-section-element");
  details_section_element.classList.remove("d-none");

  
  back_btn.addEventListener("click", async()=>{
    details_section_element.classList.add("d-none");
    filter_section.classList.remove("d-none");
    filter_section.classList.add("d-flex");
    card_section.classList.remove("d-none");
    card_section.classList.add("d-flex"); 
  });

}



       




