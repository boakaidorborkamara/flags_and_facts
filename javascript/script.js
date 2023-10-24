let card_section = document.getElementById("card-section");
const BASE_URL = "https://restcountries.com";

// start DOM manipulation and data fetching when DOM has loaded 
window.addEventListener("load", async ()=>{
  let all_countries = await getData(BASE_URL+"/v3.1/all");
  displayData(all_countries);
})





///////////////////////////////////////////////

// fetch data from API 
async function getData(url){
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


//display data to the DOM 
function displayData(data){
  // loop through data and create new cards with countries details
  data.forEach(ele => {
    // HTML card template 
    let card = `
    <div class="card shadow-sm border-0 mb-5" style="width: 18rem">
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

    //add new card to DOM based on the number of countries 
    card_section.insertAdjacentHTML("beforeend", card);
  });
}
       




