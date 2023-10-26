let body = document.getElementsByTagName("body");
let header = document.getElementsByTagName("header");
let card_section = document.getElementById("card-section");
let search_input = document.getElementById("search-input");
let filter_dropdown = document.getElementById("filter-dropdown");
let theme_btn = document.getElementById("theme-btn");
let theme_bnt_text = document.getElementById("theme-btn-text")
const BASE_URL = "https://restcountries.com";



// start DOM manipulation and data fetching when DOM has loaded 
window.addEventListener("load", async ()=>{
  let all_countries = await getCountry(BASE_URL+"/v3.1/all");
  displayCountry(all_countries);
  searchCountry(search_input);
  filterCountriesByRegion(filter_dropdown);
  toggleTheme(theme_btn);
})



//DECLEARATION OF FUNCTIONS BELOW/////////////////////////////////////////////

// accepts a url and fetches data from API using the endpoint and return it
async function getCountry(url){
    try{
      let response = await fetch(url);

      if(!response.ok){
        throw new Error("Network problem");
      }

      let data = await response.json();
      console.log(data);
      return data;
    }
    catch(error){
      if(err){
        console.log(error);
      }
    }
};

//accept a an array of countries and create bootsrap cards displying them to the DOM 
function displayCountry(data){
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
            src="${ele.flags.png?ele.flags.png:"./images/download.svg"}"
            alt="Card image cap"
            />
        </div>
        
        <div class="card-body py-4">
          <h5 class="card-title">${ele.name.common}</h5>
          <div class="mt-4 mb-2">
            <span><strong>Population: </strong>${ele.population}</span> <br />
            <span><strong>Region: </strong>${ele.region}</span><br />
            <span><strong>Capital: </strong>${ele.capital}</span><br />
          </div>
        </div>
    </div>`;

    //add new cards to DOM 
    card_section.insertAdjacentHTML("beforeend", card);
  });
}

//accept an html text input element, and diplay countries that match user input
function searchCountry(html_text_input){
  html_text_input.addEventListener("input", async ()=>{
    // user input 
    let country_to_search = search_input.value;
    let country = await getCountry(`https://restcountries.com/v3.1/name/${country_to_search}`);
   
    displayCountry(country);
  })
}

//accepts an html dropdown list of region and filter based on user selected option
function filterCountriesByRegion(html_dropdown_list){
  html_dropdown_list.addEventListener("click", async (e)=>{
     // user selected region 
     let selected_region = e.target.innerText;
     let country = await getCountry(`https://restcountries.com/v3.1/region/${selected_region}`);
     displayCountry(country);
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
       




