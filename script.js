window.addEventListener("load", function() {
   let form = document.querySelector("form");
   let pilot = document.querySelector("input[name=pilotName]");
   let copilot = document.querySelector("input[name=copilotName]");
   let fuelLevel = document.querySelector("input[name=fuelLevel]");
   let cargoMass = document.querySelector("input[name=cargoMass]");
   let formSubmit = document.getElementById("formSubmit");
   let faultyItems = document.getElementById("faultyItems");
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let launchStatus = document.getElementById("launchStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");

   form.addEventListener("submit", function(event){
      if (pilot.value === "" || copilot.value === "" || fuelLevel.value === "" || cargoMass.value === ""){
         alert("All fields are required.");
         event.preventDefault();
      }
      if (isNaN(pilot.value) === false) {
            alert("Please enter a string for the pilot's name.");
         event.preventDefault();
         }
      if (isNaN(copilot.value) === false){
         alert("Please enter a string for the copilot's name.");
         event.preventDefault();
      }

      if (isNaN(fuelLevel.value)) {
            alert("Please enter a number for the fuel level.");
         event.preventDefault();
         }

      if (isNaN(cargoMass.value)) {
         alert("Please enter a number for the cargo mass.");
         event.preventDefault();
      }
   });
   

   formSubmit.addEventListener("click", function () {
      pilotStatus.innerHTML = `Pilot ${pilot.value} is ready.`
      copilotStatus.innerHTML = `Copilot ${copilot.value} is ready.`

      if(fuelLevel.value < 10000){
         fuelStatus.innerHTML = "Not enough fuel for the journey."
         faultyItems.style.visibility = "visible";
         launchStatus.innerHTML = "Shuttle not ready for launch";
         launchStatus.style.color = "red"; 
         event.preventDefault();
      }

      if(cargoMass.value > 10000){
         faultyItems.style.visibility = 'visible';
         cargoStatus.innerHTML = "Cargo mass too high for takeoff."
         launchStatus.innerHTML = "Shuttle not ready for launch."
         launchStatus.style.color = "red";
         event.preventDefault();
      }

      if(fuelLevel.value > 10000 && cargoMass.value < 10000){
         launchStatus.innerHTML = "Shuttle is ready for launch."
         launchStatus.style.color = "green";
         event.preventDefault();
      }
   });

   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then( function(json) {
         const destination = document.getElementById("missionTarget");
         destination.innerHTML= `
         <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[5].name}</li>
               <li>Diameter: ${json[5].diameter}</li>
               <li>Star: ${json[5].star}</li>
               <li>Distance from Earth: ${json[5].distance}</li>
               <li>Number of Moons: ${json[5].moons}</li>
            </ol>
            <img src="${json[5].image}">`
      });
   });
});