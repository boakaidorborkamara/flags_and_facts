let card_section = document.getElementById("card-section");
console.log(card_section);


window.onload = () => {
  console.log("leaded");
  let url = "https://restcountries.com/v3.1/all";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      

      data.forEach(ele => {
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
            <h5 class="card-title">Country Name</h5>
            <div class="mt-4 mb-2">
              <span><strong>Population:</strong> 3,323</span> <br />
              <span><strong>Region:</strong> Europe</span><br />
              <span><strong>Capital:</strong> Berlin</span><br />
            </div>
          </div>
      </div>
    `;
        console.log(ele.flags.png);
        card_section.insertAdjacentHTML("beforeend", card);
      });
      
      console.log(data);
    })
    .catch(
      (err = {
        if(err) {
          console.log(err);
        },
      })
    );
};
