import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  // console.log("From Init()")
  // console.log(config.backendEndpoint);
  // console.log(cities);
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let result = await fetch(config.backendEndpoint+"/cities");
    let data = await result.json();
    return data;
  } catch {
    return null;
  }
}
//implementing search bar
document.getElementById("heroInput").addEventListener("input",async (e)=>{
  let citiies=await fetchCities();
  let filteredCities=citiies.filter(item=>{
    let city=item.city.toLowerCase();
    let enteredValue=e.target.value.toLowerCase();
    return city.includes(enteredValue);
  })
  document.getElementById("data").innerHTML="";
  if(filteredCities.length!==0){
    filteredCities.forEach(item=>addCityToDOM(item.id,item.city,item.description,item.image))
  }
  else{
    document.getElementById("data").innerHTML=`<h3 id="h3Color">Sorry!, We don't provide vacations for this place</h3>`;
  }

  })

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  //creating a element which has bootstrap column properties
  const colElement = document.createElement("div");
  //setting the class attributes of the div element which we have created
  colElement.setAttribute("class", "col-12  col-md-6 col-lg-3 mb-4");
  //Creating the html required for col element
  const tileHTML = `<a id=${id} href="pages/adventures/?city=${id}">
  <div class="tile">
    <div class="tile-text text-center">
      <h5>${city}</h5>
      <p>${description}</p>
    </div>
    <img class="img-responsive" src="${image}" alt="${city}">
  </div>
</a>`;
  colElement.innerHTML = tileHTML;
  //getting dom element
  const dataElem = document.getElementById("data");
  //appending data to main DOM element
  dataElem.append(colElement);
}

export { init, fetchCities, addCityToDOM };
