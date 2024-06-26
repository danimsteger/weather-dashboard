const searchFormEl = $("#search-form");
const searchInputEl = $("#search-input");
const currentWeatherEl = $("#current-weather");
const futureWeatherEl = $("#future-weather");

function handleSearchFormSubmit(event) {
  event.preventDefault();

  const searchInputVal = searchInputEl.val();
  console.log(searchInputVal);

  //   if (!searchInputVal) {
  //     console.error("You need a search input value!");
  //     return;
  //   }

  // let queryString = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInputVal}&units=imperial&appid=4f82dd0d149294627ba2d28ac435f1d2 `;
  // console.log(queryString);

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
  console.log("Current Temp:", currentTemp);
  const currentWind = data.list[0].wind.speed;
  console.log("Current Wind:", currentWind);
  const currentHumidity = data.list[0].main.humidity;
  console.log("Current Humidity:", currentHumidity);
  // const currentDate = data.list[0].dt_txt;
  // console.log(currentDate);
  // console.log(dayjs(currentDate).format("dddd, MMMM D YYYY"));
  const currentDate = dayjs(data.list[0].dt_txt).format("dddd, MMMM D YYYY");
  console.log(currentDate);

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
    .text("Humidity:    " + currentWind + " %");

  currentCardBody.append(currentCardTemp, currentCardWind, currentCardHumidity);
  currentWeatherCard.append(currentCardHeader, currentCardBody);

  currentWeatherEl.append(currentWeatherCard);
};

const displayFutureCityWeather = function (data) {
  console.log(data);
  const firstNoon = data.list.findIndex((object) => {
    const time = object.dt_txt.split(" ")[1];
    return time === "12:00:00";
  });
  console.log(firstNoon);
  for (let i = firstNoon; i < data.list.length; i += 8) {
    console.log(i);
    console.log(data.list[i].dt_txt);
    const futureTemp = data.list[i].main.temp;
    console.log("Future Temp", [i], ":", futureTemp);
    const futureWind = data.list[i].wind.speed;
    console.log("Wind:", futureWind);
    const futureHumidity = data.list[i].main.humidity;
    console.log("Humidity:", futureHumidity);
    const futureDate = dayjs(data.list[i].dt_txt).format("MMMM D YYYY");
    console.log(futureDate);

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
      .html("Humidity:<br>" + futureWind + " %");

    futureCardBody.append(futureCardTemp, futureCardWind, futureCardHumidity);
    futureWeatherCard.append(futureCardHeader, futureCardBody);

    futureWeatherEl.append(futureWeatherCard);
  }
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
