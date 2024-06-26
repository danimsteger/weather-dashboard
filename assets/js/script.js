const searchFormEl = $("#search-form");
const searchInputEl = $("#search-input");
const currentWeatherEl = $("#current-weather");
const futureWeatherHeaderEl = $("#future-weather-header");
const futureWeatherEl = $("#future-weather");
const savedCities = $("#saved-searches");

function handleSearchFormSubmit(event) {
  event.preventDefault();

  const city = searchInputEl.val();
  console.log(city);

  // Only does the following if a city is inputed.
  if (city !== "") {
    getCityWeather(city);

    // Clears existing city weather before rendering the weather of the new city
    currentWeatherEl.html("");
    futureWeatherEl.html("");
    futureWeatherHeaderEl.html("");
  } else {
    alert("Please enter a valid city name");
  }
}

const getCityWeather = function (city) {
  // API URL with the searched city to get data of that city
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=4f82dd0d149294627ba2d28ac435f1d2 `;

  fetch(apiUrl)
    .then(function (response) {
      // If the response works, do all the following functions.
      if (response.ok) {
        response.json().then(function (data) {
          displayCurrentCityWeather(data);
          displayFutureCityWeather(data);
          // Adds searched city to the cities array.
          cities.push(city);
          storeCities();
          renderCities();

          // Clears search bar
          searchInputEl.val("");
        });
      } else {
        alert("Error: Please input your search again");
        return;
      }
    })
    .catch(function (error) {
      alert("Unable to connect to OpenWeather");
    });
};

const displayCurrentCityWeather = function (data) {
  // Gathers different elements of data from the first object in the API data array (the current weather).
  const currentTemp = data.list[0].main.temp;
  const currentWind = data.list[0].wind.speed;
  const currentHumidity = data.list[0].main.humidity;
  // Converts date.
  const currentDate = dayjs(data.list[0].dt_txt).format("dddd, MMMM D, YYYY");
  const currentweather = data.list[0].weather[0].icon;
  // Gets link to weather icon.
  const currenticonUrl = `https://openweathermap.org/img/wn/${currentweather}@2x.png`;

  // Creates card for the current weather.
  const currentWeatherCard = $("<div>").addClass(
    "card current-card col-12 mt-4 text-center"
  );
  const currentCardHeader = $("<div>")
    .addClass("card-header text-center my-2 h3 bg-info text-white")
    .text(data.city.name + ":    " + currentDate);
  const currentCardBody = $("<div>").addClass("card-body");
  const currentCardTemp = $("<p>")
    .addClass("card-text")
    .text("Temp:   " + currentTemp + "°F");
  const currentCardWind = $("<p>")
    .addClass("card-text")
    .text("Wind:    " + currentWind + " MPH");
  const currentCardHumidity = $("<p>")
    .addClass("card-text")
    .text("Humidity:    " + currentHumidity + " %");
  const futureWeatherHeader = $("<h3>")
    .addClass("card-header h4 bg-info text-white")
    .text("5-Day Forecast:");

  const currentweatherIcon = $("<img>")
    .attr("src", currenticonUrl)
    .addClass("mb-1");

  // Appends the parts of the card and the card to the page.
  currentCardBody.append(
    currentweatherIcon,
    currentCardTemp,
    currentCardWind,
    currentCardHumidity
  );
  currentWeatherCard.append(currentCardHeader, currentCardBody);

  currentWeatherEl.append(currentWeatherCard);
  futureWeatherHeaderEl.append(futureWeatherHeader);
};

const displayFutureCityWeather = function (data) {
  // Finds the first object in the array that is for 12:00 noon
  const firstNoon = data.list.findIndex((object) => {
    const time = object.dt_txt.split(" ")[1];
    return time === "12:00:00";
  });

  // Starting with the first object for noon, iterate over every 8th object (24hrs later - noon the following day) to create future weather cards for the next 5 days.
  for (let i = firstNoon; i < data.list.length; i += 8) {
    // Gathers data for future weather cards from API data array.
    const futureTemp = data.list[i].main.temp;
    const futureWind = data.list[i].wind.speed;
    const futureHumidity = data.list[i].main.humidity;
    const futureDate = dayjs(data.list[i].dt_txt).format("MMMM D");
    const futureweather = data.list[i].weather[0].icon;
    const futureiconUrl = `https://openweathermap.org/img/wn/${futureweather}@2x.png`;

    // Creates future weather cards.
    const futureWeatherCard = $("<div>").addClass(
      "card future-card col-2 mx-2 text-white bg-secondary text-center"
    );
    const futureCardHeader = $("<div>")
      .addClass("h4 mt-2")
      .html(futureDate + "<hr/>");
    const futureCardBody = $("<div>").addClass("card-body");
    const futureCardTemp = $("<p>")
      .addClass("card-text")
      .html("Temp: <br>" + futureTemp + "°F");
    const futureCardWind = $("<p>")
      .addClass("card-text")
      .html("Wind:<br>" + futureWind + " MPH");
    const futureCardHumidity = $("<p>")
      .addClass("card-text")
      .html("Humidity:<br>" + futureHumidity + " %");

    const futureWeatherIcon = $("<img>")
      .attr("src", futureiconUrl)
      .addClass("mb-2");

    // Appends future weather cards to the page.
    futureCardBody.append(
      futureWeatherIcon,
      futureCardTemp,
      futureCardWind,
      futureCardHumidity
    );
    futureWeatherCard.append(futureCardHeader, futureCardBody);

    futureWeatherEl.append(futureWeatherCard);
  }
};

// Creates an array of all previously searched cities.
let cities = [];

// Stores cities array locally.
function storeCities() {
  localStorage.setItem("cities", JSON.stringify(cities));
}
// function removeDuplicates(data) {
//   return data.filter((value, index) => data.indexOf(value) === index);
// }

console.log(removeDuplicates(cities));

function renderCities() {
  // Clear saved cities list
  savedCities.html("");

  // For each city in the array to the following...
  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];
    // Create a button for each city that was previously searched.
    const savedCity = $("<button>");
    savedCity
      .attr("data-city", city)
      .attr("type", "button")
      .addClass("btn btn-secondary btn-block my-1")
      .text(city);

    savedCities.append(savedCity);
  }
}

// Load previously searched cities list when the page is refreshed.
function init() {
  const storedCities = JSON.parse(localStorage.getItem("cities"));

  if (storedCities !== null) {
    cities = storedCities;

    renderCities();
  }
}

// When you click on a previous city button, get weather for that city and display it.
const buttonClick = function (event) {
  const city = event.target.getAttribute("data-city");

  if (city) {
    getCityWeather(city);
    currentWeatherEl.html("");
    futureWeatherEl.html("");
    futureWeatherHeaderEl.html("");
  }
};

searchFormEl.on("submit", handleSearchFormSubmit);

savedCities.on("click", buttonClick);
init();
