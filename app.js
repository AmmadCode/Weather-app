
const apiKey = "ad953bc51caa3cf4656a3a52a9c60e2f";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherElement = document.querySelector(".weather");
const errorElement = document.querySelector(".error");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
        errorElement.style.display = "block";
        weatherElement.classList.remove("show");
        weatherElement.style.display = "none";
    } else {
        const data = await response.json();
        console.log(data);

        // Get the current time, sunrise, and sunset times
        const now = new Date();
        console.log(now);
        const sunrise = new Date(data.sys.sunrise * 1000);
        console.log(sunrise);
         // Convert from UNIX timestamp to Date object
        const sunset = new Date(data.sys.sunset * 1000);
        console.log(sunset);  // Convert from UNIX timestamp to Date object

        // Determine if it's day or night
        const isDaytime = now >= sunrise && now < sunset; // Check if it's daytime
        console.log(isDaytime);

        // Update weather details
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Update the weather icon based on conditions and time of day
        if (data.weather[0].main === "Clear") {
            weatherIcon.src = isDaytime ? "asset/sun.gif" : "asset/night.gif"; // Sun for day, Moon for night
        } else if (data.weather[0].main === "Clouds") {
            weatherIcon.src = isDaytime ? "asset/cloudy.png" : "asset/cloudy-night.gif"; // Daytime vs Nighttime cloud
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "asset/rain.gif";
        } else if (data.weather[0].main === "Smoke") {
            weatherIcon.src = "asset/smoke.png"; // Smoke doesn't depend on time
        } 
        // Change background based on daytime or nighttime
        document.body.style.background = isDaytime
            ? "linear-gradient(to bottom, #87CEEB, #4682B4)"  // Daytime background
            : "linear-gradient(to bottom, #001D3D, #003566)";  // Nighttime background

        // Show weather info smoothly
        weatherElement.style.display = "block";
        weatherElement.classList.remove("show");
        void weatherElement.offsetWidth; // Trigger reflow
        weatherElement.classList.add("show");

        errorElement.style.display = "none";  // Hide error if successful

        // Clear the search input
        searchBox.value = "";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});




