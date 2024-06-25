const searchFormEl = $("#search-form");
const searchInputEl = $("#search-input");
const currentWeatherEl = $("#current-weather");

function handleSearchFormSubmit(event) {
  event.preventDefault();

  const searchInputVal = searchInputEl.val();
  console.log(searchInputVal);

  //   if (!searchInputVal) {
  //     console.error("You need a search input value!");
  //     return;
  //   }

  let queryString = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInputVal}&units=imperial&appid=4f82dd0d149294627ba2d28ac435f1d2 `;
  console.log(queryString);

  if (searchInputVal) {
    getCityWeather(searchInputVal);
    currentWeatherEl.textcontent = "";
    searchInputEl.value = "";
  }
  //else {
  //   alert("Please enter a valid city name");
  // }
}

const getCityWeather = function (city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=4f82dd0d149294627ba2d28ac435f1d2 `;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          displayCurrentCityWeather(data);
        });
      } else {
        alert("Error:${response.statusText}");
      }
    })
    .catch(function (error) {
      alert("Unable to connect to OpenWeather");
    });
};

const displayCurrentCityWeather = function (data) {
  const currentTemp = data.list[0].main.temp;
  console.log("Current Temp:", currentTemp);
  const currentWind = data.list[0].wind.speed;
  console.log("Current Wind:", currentWind);
  const currentHumidity = data.list[0].main.humidity;
  console.log("Current Humidity:", currentHumidity);

  // const currentWeatherCard = $("<div>").addClass("card current-card col-12");
  // const currentCardHeader = $("<div>").addClass("card-header").text(city);
  // const currentCardBody = $("<div>").addClass("card-body");
  // const currentCardTemp = $("<p>").addClass("card-text").text("Temp:");
};

// const displayWeather = function (data, searchTerm) {
//   if (MediaCapabilities.length === 0) {
//     currentWeatherEl.textContent = "City not found.";
//     return;
//   }

//   for (let cityObj of city) {
//     const cityName =
//   }

searchFormEl.on("submit", handleSearchFormSubmit);
