const searchFormEl = $("#search-form");
const searchInputEl = $("#search-input");

function handleSearchFormSubmit(event) {
  event.preventDefault();

  const searchInputVal = searchInputEl.val();
  console.log(searchInputVal);

  if (!searchInputVal) {
    console.error("You need a search input value!");
    return;
  }

  const queryString = `api.openweathermap.org/data/2.5/forecast?q=${searchInputVal}&appid=4f82dd0d149294627ba2d28ac435f1d2
`;

  console.log(queryString);
}

searchFormEl.on("submit", handleSearchFormSubmit);
