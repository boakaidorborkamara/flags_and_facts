window.onload = () => {
  console.log("leaded");
  let url = "https://restcountries.com/v3.1/all";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
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
