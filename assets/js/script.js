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
    cities.push(city);
    console.log(cities);
    searchInputEl.val("");
    // Clears existing city weather before rendering the weather of the new city
    currentWeatherEl.html("");
    futureWeatherEl.html("");
    futureWeatherHeaderEl.html("");
    storeCities();
    renderCities();
  } else {
    alert("Please enter a valid city name");
  }
}

const getCityWeather = function (city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=4f82dd0d149294627ba2d28ac435f1d2 `;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          displayCurrentCityWeather(data);
          displayFutureCityWeather(data);
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
  const currentWind = data.list[0].wind.speed;
  const currentHumidity = data.list[0].main.humidity;
  const currentDate = dayjs(data.list[0].dt_txt).format("dddd, MMMM D YYYY");
  const currentweather = data.list[0].weather[0].icon;
  const currenticonUrl = `https://openweathermap.org/img/wn/${currentweather}@2x.png`;

  const currentWeatherCard = $("<div>").addClass("card current-card col-12");
  const currentCardHeader = $("<div>")
    .addClass("card-header")
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
    .addClass("card-header")
    .text("5-Day Forecast:");

  const currentweatherIcon = $("<img>").attr("src", currenticonUrl);

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
  console.log(data);
  const firstNoon = data.list.findIndex((object) => {
    const time = object.dt_txt.split(" ")[1];
    return time === "12:00:00";
  });
  console.log(firstNoon);
  for (let i = firstNoon; i < data.list.length; i += 8) {
    const futureTemp = data.list[i].main.temp;
    const futureWind = data.list[i].wind.speed;
    const futureHumidity = data.list[i].main.humidity;
    const futureDate = dayjs(data.list[i].dt_txt).format("MMMM D YYYY");
    const futureweather = data.list[i].weather[0].icon;
    const futureiconUrl = `https://openweathermap.org/img/wn/${futureweather}@2x.png`;

    const futureWeatherCard = $("<div>").addClass(
      "card future-card col-2 mx-2 text-white bg-secondary"
    );
    const futureCardHeader = $("<div>")
      .addClass("card-header")
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

    const futureWeatherIcon = $("<img>").attr("src", futureiconUrl);

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

let cities = [];

// function renderCities() {
//   savedCities.innerHTML = "";
//   for (let i = 0, )
// }

function storeCities() {
  localStorage.setItem("cities", JSON.stringify(cities));
}

function renderCities() {
  savedCities.html("");

  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];

    const savedCity = $("<button>");
    savedCity.attr("data-city", city).text(city);

    savedCities.append(savedCity);
  }
}

function init() {
  const storedCities = JSON.parse(localStorage.getItem("cities"));

  if (storedCities !== null) {
    cities = storedCities;

    renderCities();
  }
}

const buttonClick = function (event) {
  const city = event.target.getAttribute("data-city");
  console.log(city);
  if (city) {
    getCityWeather(city);
    currentWeatherEl.html("");
    futureWeatherEl.html("");
    futureWeatherHeaderEl.html("");
  }
  // const
  // getCityWeather()
};

searchFormEl.on("submit", handleSearchFormSubmit);
// savedCities.on("click", console.log("clicking"));
savedCities.on("click", buttonClick);
init();
