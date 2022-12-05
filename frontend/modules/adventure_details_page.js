import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  var adventureId = search.substring(search.lastIndexOf('=') + 1);
  return adventureId;
  // Place holder for functionality to work in the Stubs
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let response=await fetch(config.backendEndpoint+`/adventures/detail/?adventure=${adventureId}`);
    let data=await response.json();
    return data;
  }catch{
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
    // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  // Get all the necessary elements from the DOM
  const adventureNameElement = document.querySelector("#adventure-name");
  const adventureSubtitleElement = document.querySelector(
    "#adventure-subtitle"
  );
  const photoGalleryElement = document.querySelector("#photo-gallery");
  const adventureContentElement = document.querySelector("#adventure-content");
  // Set the text content of all the elements
  adventureNameElement.textContent = adventure.name;
  adventureSubtitleElement.textContent = adventure.subtitle;
  adventureContentElement.textContent = adventure.content;
  // loop through the imgage array of adventure object and add it to dom
  adventure.images.forEach((image) => {
    // create a div element
    const imgContainerElement = document.createElement("div");
    // set the innerHTML of the divElement to image
    imgContainerElement.innerHTML = `
      <img src=${image} class="activity-card-image" alt="adventure image">
    `;
    // append the div element to the photo gallery
    photoGalleryElement.append(imgContainerElement);
  });
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
    // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  // get photo gallery element fromt the dom
  const photoGalleryElement = document.querySelector("#photo-gallery");
  // set the controls of the bootstrap carousel
  photoGalleryElement.innerHTML = `
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  `;
  const carouselInnerEl = document.querySelector(".carousel-inner");
  // loop over the images append them to corousel inner element
  images.forEach((image, index) => {
    // create a carousel item
    const carouselItem = document.createElement("div");
    // set the first image as active item
    const className = index === 0 ? "carousel-item active" : "carousel-item";
    carouselItem.setAttribute("class", className);
    // set the innerHTML of the carousel item to image
    carouselItem.innerHTML = `
      <img src=${image} class="activity-card-image" alt="adventure image" >
    `;
    // append the carouel item to the carousel inner element
    carouselInnerEl.append(carouselItem);
  });

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
    let rpa=document.getElementById("reservation-panel-available");
    let rps=document.getElementById("reservation-panel-sold-out");
    rps.style.display="none";
    rpa.style.display="block";
  }else{
    let rpa=document.getElementById("reservation-panel-available");
    let rps=document.getElementById("reservation-panel-sold-out");
    rps.style.display="block";
    rpa.style.display="none";
  }
  let costPerHead=document.getElementById("reservation-person-cost");
  costPerHead.innerHTML=String(adventure.costPerHead);
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let res= persons*adventure.costPerHead;
  document.getElementById("reservation-cost").innerHTML=res;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const data={};
  document.getElementById("myForm").addEventListener("submit",(e)=>{
    e.preventDefault();
    data["name"]=document.getElementById("name").value;
    data["date"]=document.getElementById("date").value;
    data["person"]=document.getElementById("totalPersons").value;
    data["adventure"]=adventure.id;
    submitData(data);
  })
  let submitData=async(data)=>{
    try{
      let res= await fetch(config.backendEndpoint+"/reservations/new",{
        method:"POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
      if(res.ok){
        alert("Success!!!")
        location.reload();
      }else{
        alert("Failed!");
      }
    }
    catch{
      alert("Failed!")
      return null;
    }
  }
}

//Implementation of success banner after reservatio

function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  let bannerVar=document.getElementById("reserved-banner");
  if(adventure.reserved){
    bannerVar.style.display="block";
  }else{
    bannerVar.style.display="none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
