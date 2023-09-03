// Fetch Button to get Location
const fetchButton = document.getElementById("fetch-btn");
fetchButton.addEventListener("click", fetchWeather);

// Latitude & Longitude
var latitude = "";
var longitude = "";

function fetchWeather() {
  console.log("inside check weather");
  fetchLocation();
  // getLocationName();
  alert("Please Hang on, We will get you the data.");
  setTimeout(fetchResults, 5000);
}

// Fetch Location Details
function fetchLocation() {
  console.log("inside fetch location");
  const successCallback = (position) => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
  };

  const errorCallback = (error) => {
    alert("Permission Denied.");
  };

  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}

function renderData(result) {
  console.log("inside render function");
  const bodyContainer = document.getElementsByTagName("body")[0];
  const mainContainer = document.getElementById("container");
  bodyContainer.style.height = "150vh";
  const container = document.createElement("div");
  container.className = "containerInfo";
  // container.style.width = "100vh";
  // container.style.backgroundColor = "#360369";
  const dataContainer = document.createElement("div");
  dataContainer.className = "dataContainer";

  container.innerHTML = `
    <p>Welcome to the Weather App</p>
            <span>Here is your current location.</span>
            <div class="locationData">
                <div class="latitude">Lat: ${result.coord.lat}</div>
                <div class="longitude">Long: ${result.coord.lon}</div>
            </div>
            <iframe src="https://maps.google.com/maps?q=${result.coord.lat}, ${result.coord.lon}&output=embed" width="360" height="270" frameborder="0"></iframe>`;
  dataContainer.innerHTML = `
            <p>Your Weather Data</p>
                    <div class="details">
                      <div>
                        <div class="box">Location: ${result.name}</div>
                        <div class="box">Wind Speed: ${result.wind.speed}</div>
                        <div class="box">Humidity: ${result.main.humidity}</div>
                      </div>
                      <div>
                        <div class="box">Time Zone: ${result.timezone}</div>
                        <div class="box">Pressure: ${result.main.pressure} </div>
                        <div class="box">Wind-Direction: ${result.wind.deg}</div>
                      </div>
                      <div>
                        <div class="box">UV Index: Not Available </div>
                        <div class="box">Feels Like: ${result.main.feels_like}</div>
                      </div>
                    </div>`;

  bodyContainer.removeChild(mainContainer);
  bodyContainer.append(container, dataContainer);
}

// Network Call to fetch Data
async function fetchResults() {
  console.log("inside fetchResults");
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  try {
    const response = await fetch(URL);
    const result = await response.json();
    renderData(result);
  } catch (error) {
    alert(`Some Error Occurred, Please refresh and Try again.`);
  }
}

const apiKey = "f32bda67c682fd821ee415a6b9667897";

// async function getLocationName() {
//   console.log("inside getLocation");
//   const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
//   try {
//     const response = await fetch(url);
//     const result = response.json();
//     console.log(result);
//   } catch (error) {
//     console.log("Error");
//   }
// }
