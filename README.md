# weather-dashboard

## Description

This project invovled creating a webpage that displays the current and future weather of a city that the user searches for. This required fetching the OpenWeather API, manipulating the data that it returned, and populating that data on the page. This project was created from scratch using HTML, CSS, JavaScript, jQuery, dayjs, and Bootstrap. This practical project helped to reinforce Javascript skills while also practicing with jQuery and making API requests. You can view this webpage by clicking [here](https://danimsteger.github.io/weather-dashboard/).

![Sample view of the page](/assets/images/page.png)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

To access the live project, you can visit this [link](https://danimsteger.github.io/weather-dashboard/).

To view the code of this project, you can clone this repository using the following commands in your command line:

### Clone this repository

```
git clone git@github.com:danimsteger/weather-dashboard.git
```

### Go into this repository

```
cd weather-dashboard
```

### Access code of the repository

```
code .
```

## Usage

To view the weather for a given city, type the city in the search bar on the left side of the page and press the 'Enter' key or click the 'Search' button. If you press 'Enter' or click the 'Search' button without typing anything into the search bar, you will be prompted with an alert that says "Please enter a valid city name". If you type a city that is not available through the OpenWeather API, you will be prompted with an alert that says "Error: Please input your search again."

![Sample view of searching a city](/assets/images/search.png)

Once you search for a city, the weather for that city will be displayed on the page. At the top, you will see the city name and the current date. Then, you will see an icon for the current weather, and the current temperature in degrees Fahrenheit, wind speed, and humidity percentage. Under the current weather card, the same weather values and icons for the next five days at noon will be displayed.

![Sample view of displayed weather for a given city](/assets/images/weather.png)

Additionally, a list of the cities that have been searched will populate on the left under the city search bar. When you refresh the page, the weather goes away, but the list of cities remain. To view the weather for a previously-searched city, you can click the button for that city and it will display the current weather for that city, without you having to retype the city name in the search bar.

![Sample view of saved cities list](/assets/images/saved-cities.png)

The previously-searched cities are stored in an array local storage. You can view them if you right-click on the page and choose 'Inspect' from the drop-down menu. A new window will open on the right side of the screen and from their you can view the local storage. If on a Firefox browser, the pane will open at the bottom of your screen, instead of on the right side.

![Sample view of local storage](/assets/images/local-storage.png)

## Credits

This project was entirely created by Danielle Steger. To complete this project, I referenced several articles on "MDN Web Docs" and "W3Schools." Additionally, I referenced materials provided by edX Boot Camps LLC. This project was completed with the use of several outside libriaries including jQuery, Bootstrap, and dayjs and their corresponding documentation was referenced as well. Additionally, the OpenWeather API was used to get relevant weather data.

## License

Distributed under the MIT License. See [LICENSE](LICENSE).
