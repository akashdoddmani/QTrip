
import config from "../conf/index.js";
//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  // You can also use document.URL
  var cityID = search.substring(search.lastIndexOf('=') + 1);
  return cityID;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  try{
    let response=await fetch(config.backendEndpoint+`/adventures?city=${city}`);
    let data=response.json();
    return data;
  }catch{
    return null;
  }
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let rowDiv=document.querySelector('#data');
  rowDiv.innerText="";
  adventures.forEach((item)=>{
    const colDiv = document.createElement("div");
    colDiv.setAttribute("class", "col-md-6 col-lg-4 col-xl-3 mb-4");
    const cardHTML =
    `<a href="detail/?adventure=${item.id}" id="${item.id}">
    <div class="activity-card">
      <img class="img-responsive" src="${item.image}" alt="${item.name}">
      <div class="category-banner category-filter">
      <p>${item.category}</p>
      </div>
       <div class="activity-card-text text-center w-100 mt-3 ">
           <div class="d-block d-flex justify-content-between  pl-4 pr-4 name-price">
             <h4 class='fs-6'>${item.name}</h4>
             <span>₹${item.costPerHead}</span>    
           </div>
           <div class="d-block d-flex flex-wrap justify-content-between  pl- pr-4 duration">
           <h4 class='fs-6'>Duration</h4>       
             <span>${item.duration} hours</span>
           </div>
       </div>
     </div>
   </a>`;
  colDiv.innerHTML=cardHTML;
  rowDiv.append(colDiv);
  })

}
function addNewAdventure(city) {
  // get the button from the dom
  const addAdventureBtn = document.querySelector(".add-adventure-btn");
  // create the city object that need to be passed as the body of POST request
  // Add an event listner to the button for click event
  addAdventureBtn.addEventListener("click", async function () {
    const cityObject ={"city":city,};
    // create a url that needs to be hit when the button is clicked
    const URL = `${config.backendEndpoint}/adventures/new`;
    // make a post request to the url using post method
   fetch(URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(cityObject)
    });
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter(item=>item.duration>=low&&item.duration<=high);
  
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  let result=list.filter(item=>categoryList.includes(item.category));
  // console.log(result);
  return result;
  // 1. Filter adventures based on their Category and return filtered list
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters){
  if(filters.category.length!==0){
    list=filterByCategory(list,filters.category);
  }
  if(filters.duration){
    let[low,high]=filters.duration.split("-");    
    list=filterByDuration(list,low,high);
  }
    return list;
  }
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  
  // Place holder for functionality to work in the Stubs
//   return filteredList;
// }

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let filters=JSON.parse(localStorage.getItem("filters"));
  // Place holder for functionality to work in the Stubs
  return filters;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let area=document.getElementById('category-list');
  area.innerText="";
  filters.category.forEach(item=>{
    let buttonElem=document.createElement('button');
    buttonElem.setAttribute("class","category-pill btn-secondary ");
    buttonElem.setAttribute("type","button");
    area.append(buttonElem);
    buttonElem.append(item);
    buttonElem.innerHTML+=`<span class="pill-span">&nbsp;&nbsp;x</span>`;
  });
}
function cancelPillsInDom(filters,adventures) {
  let area=document.querySelector('#category-list');
  area.addEventListener('click',(e)=>{
    if(e.target.className==="pill-span"){
      const res=e.target.closest(".category-pill").textContent;
      let categoryToRemove=res.slice(0,-3);
      filters.category=removeFilter(filters.category,categoryToRemove);
      let newAdventures=filterFunction(adventures, filters);
      generateFilterPillsAndUpdateDOM(filters);
      addAdventureToDOM(newAdventures);
      saveFiltersToLocalStorage(filters);
    }
  })
}

let removeFilter=(category,categoryToRemove)=>{
  let resultFilter=category.filter(item=>item!==categoryToRemove);
  return resultFilter;
}

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  addNewAdventure,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
  cancelPillsInDom,
};
