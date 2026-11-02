const inputElement = document.getElementById("inputElement");

const searchBtn = document.getElementById("searchBtn");

const weatherData = document.getElementById("weatherData");


searchBtn.addEventListener("click", getWeatherData);


inputElement.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        getWeatherData();
    }

});


async function getWeatherData() {

    const city = inputElement.value.trim();

    console.log("City:", city);


    if (city === "") {

        weatherData.innerHTML = `
            <p class="welcome-message">
                Please enter a city name.
            </p>
        `;

        return;
    }


    weatherData.innerHTML = `
        <p class="welcome-message">
            Loading weather... 🌤️
        </p>
    `;

    searchBtn.disabled = true;


    try {

        const response = await fetch(
            `https://wttr.in/${encodeURIComponent(city)}?format=j1`
        );


        const data = await response.json();

        console.log("Data:", data);


        if (
            !data.current_condition ||
            data.current_condition.length === 0
        ) {

            throw new Error("City not found");
        }


        const currentWeather = data.current_condition[0];


        const location = data.nearest_area[0];

        const cityName = location.areaName[0].value;

        const region = location.region[0].value;

        const country = location.country[0].value;


        const temperature = currentWeather.temp_C;

        const feelsLike = currentWeather.FeelsLikeC;

        const humidity = currentWeather.humidity;

        const windSpeed = currentWeather.windspeedKmph;

        const cloudCover = currentWeather.cloudcover;

        const visibility = currentWeather.visibility;

        const condition = currentWeather.weatherDesc[0].value;

        const icon = currentWeather.weatherIconUrl[0].value;

        const observationTime = currentWeather.observation_time;


        weatherData.innerHTML = `

            <div class="location">

                <h2>${region}</h2>

                <p>${country}</p>

            </div>


            <div class="main-weather">

                <img
                    class="weather-icon"
                    src="${icon}"
                    alt="${condition}"
                >

                <div class="temperature">
                    ${temperature}°C
                </div>

                <div class="condition">
                    ${condition}
                </div>

                <div class="feels-like">
                    Feels like ${feelsLike}°C
                </div>

            </div>


            <div class="weather-details">

                <div class="weather-card">

                    <h3>💧 Humidity</h3>

                    <p>${humidity}%</p>

                </div>


                <div class="weather-card">

                    <h3>💨 Wind Speed</h3>

                    <p>${windSpeed} km/h</p>

                </div>


                <div class="weather-card">

                    <h3>☁️ Cloud Cover</h3>

                    <p>${cloudCover}%</p>

                </div>


                <div class="weather-card">

                    <h3>👁️ Visibility</h3>

                    <p>${visibility} km</p>

                </div>

            </div>


            <p class="observation">

                Observation Time: ${observationTime}

            </p>
        `;


    } catch (error) {

        console.log("Error:", error);

        weatherData.innerHTML = `

            <p class="welcome-message">
                ❌ City not found or something went wrong.
            </p>

        `;

    }


    searchBtn.disabled = false;
}


