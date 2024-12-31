const apiKey = "c18a714c7f988b9fe74dfc535087273d"; // Replace with your OpenWeatherMap API key

// Fetch weather details for the selected city
async function fetchWeatherDetails() {
  const city = localStorage.getItem("city");
  if (!city) {
    alert("No city selected. Redirecting to the main page.");
    window.location.href = "index.html";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  document.getElementById("city-name").textContent = data.name;
  document.getElementById("temperature").textContent = data.main.temp;
  document.getElementById("wind-speed").textContent = data.wind.speed;
  document.getElementById("humidity").textContent = data.main.humidity;
  document.getElementById("weather-description").textContent = data.weather[0].description;
}

// Go back to the main page
function goBack() {
  window.location.href = "index.html";
}

// Fetch weather details on page load
fetchWeatherDetails();
