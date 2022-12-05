import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    let res=await fetch(config.backendEndpoint+"/reservations");
    let data=await res.json();
  // Place holder for functionality to work in the Stubs
    return data;
  }catch{
    return null;
  }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  let tableBody=document.getElementById("reservation-table");
  if(reservations.length!==0){
    document.getElementById("no-reservation-banner").style.display="none";
    document.getElementById("reservation-table-parent").style.display="block"
  }else{
    document.getElementById("no-reservation-banner").style.display="block";
    document.getElementById("reservation-table-parent").style.display="none"
  }
  reservations.forEach(item=>{
    let trElem=document.createElement("tr");
    let transactionId=document.createElement("td");
    let bookingName=document.createElement("td");
    let adventure=document.createElement("td");
    let persons=document.createElement("td");
    let date=document.createElement("td");
    let price=document.createElement("td");
    let bookingTime=document.createElement("td");
    let action=document.createElement("td");
    action.id=item.id;
    action.innerHTML=`<a href="../detail/?adventure=${item.adventure}" class="reservation-visit-button">Visit Adventure</a>`
    transactionId.innerHTML=item.id;
    bookingName.innerHTML=item.name;
    adventure.innerHTML=item.adventureName;
    persons.innerHTML=item.person;
    date.innerHTML=new Date(item.date).toLocaleDateString("en-IN");
    price.innerHTML=item.price;
    bookingTime.innerHTML=new Date(item.time).toLocaleTimeString("en-IN",{  day:"numeric", month:"long",  year:"numeric"}).replace(" at" , ",");
    trElem.append(transactionId,bookingName,adventure,persons,date,price,bookingTime,action);
    tableBody.append(trElem);
  })
  //Conditionally render the no-reservation-banner and reservation-table-parent
 
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
