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

  let queryString = `api.openweathermap.org/data/2.5/forecast?q=${searchInputVal}&units=imperial&appid=4f82dd0d149294627ba2d28ac435f1d2 `;
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
  const apiUrl = `api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=4f82dd0d149294627ba2d28ac435f1d2 `;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data, city);
        });
      } else {
        alert("Error:${response.statusText}");
      }
    })
    .catch(function (error) {
      alert("Unable to connect to OpenWeather");
    });
};

// const displayWeather = function (data, searchTerm) {
//   if (MediaCapabilities.length === 0) {
//     currentWeatherEl.textContent = "City not found.";
//     return;
//   }

//   for (let cityObj of city) {
//     const cityName =
//   }
// };
searchFormEl.on("submit", handleSearchFormSubmit);
