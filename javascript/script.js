let card_section = document.getElementById("card-section");
let search_input = document.getElementById("search-input");

const BASE_URL = "https://restcountries.com";

// start DOM manipulation and data fetching when DOM has loaded 
window.addEventListener("load", async ()=>{
  let all_countries = await getCountry(BASE_URL+"/v3.1/all");
  displayCountry(all_countries);
  searchCountry(search_input);
})





///////////////////////////////////////////////

// fetch data from API and return it
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
    <div class="card shadow-sm border-0 mb-5" style="width: 18rem">
        <div class="h-75">
          <a href="">
            <img
            class="card-img-top w-100 h-100" 
            src="${ele.flags.png?ele.flags.png:"./images/download.svg"}"
            alt="Card image cap"
            />
          </a>
          
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

//accept an html input field, and diplay countries that match user input
function searchCountry(html_text_input){
  html_text_input.addEventListener("input", async ()=>{
    let country_to_search = search_input.value;
    let country = await getCountry(`https://restcountries.com/v3.1/name/${country_to_search}`);
   
    displayCountry(country);
  })
}
       




