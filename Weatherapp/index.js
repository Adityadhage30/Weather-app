document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    const city = document.querySelector("#city-input").value.trim();
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const apiKey = "YOUR_API_KEY";  // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then((data) => {
            updateWeather(data);
        })
        .catch((error) => {
            alert(error.message);
        });
});

function updateWeather(data) {
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const feelsLike = Math.round(data.main.feels_like);
    const humidity = data.main.humidity;
    const wind = data.wind.speed;

    document.querySelector(".icon img").src = iconUrl;
    document.querySelector(".temperature").textContent = `${temp}°C`;
    document.querySelector(".description").textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
    document.querySelector(".details").innerHTML = `
        <div>Feels like: ${feelsLike}°C</div>
        <div>Humidity: ${humidity}%</div>
        <div>Wind speed: ${wind} m/s</div>
    `;
}
