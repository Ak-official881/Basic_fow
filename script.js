const apiKey = "c18a714c7f988b9fe74dfc535087273d"; // Replace with your OpenWeatherMap API key

// Get and display the current date and time
function updateTimeAndDate() {
  const now = new Date();
  document.getElementById("time").textContent = now.toLocaleTimeString();
  document.getElementById("date").textContent = now.toLocaleDateString();
}
setInterval(updateTimeAndDate, 1000);

// Get user location weather
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      document.getElementById("location-info").textContent = `
        ${data.name}: ${data.main.temp}°C, ${data.weather[0].description}
      `;
    });
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

// Search city weather and save it to recent searches
function searchCityWeather() {
  const city = document.getElementById("search-input").value.trim();
  if (city) {
    // Save city to recent searches
    saveRecentSearch(city);

    // Redirect to weather details page
    localStorage.setItem("city", city);
    window.location.href = "details.html";
  } else {
    alert("Please enter a city name.");
  }
}

// Save recent searches to localStorage
function saveRecentSearch(city) {
  let recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
  
  // Avoid duplicates and limit to 5 recent searches
  if (!recentSearches.includes(city)) {
    recentSearches.unshift(city);
    if (recentSearches.length > 5) {
      recentSearches.pop();
    }
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }

  // Update the UI
  displayRecentSearches();
}

// Display recent searches in the UI
function displayRecentSearches() {
  const recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
  const recentSearchList = document.getElementById("recent-search-list");

  // Clear the list before rendering
  recentSearchList.innerHTML = "";

  recentSearches.forEach((city) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${city}</span>
      <button class="remove-btn" onclick="removeRecentSearch('${city}')">Remove</button>
    `;
    recentSearchList.appendChild(li);
  });
}

// Remove a city from recent searches
function removeRecentSearch(city) {
  let recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
  recentSearches = recentSearches.filter((item) => item !== city);
  localStorage.setItem("recentSearches", JSON.stringify(recentSearches));

  // Update the UI
  displayRecentSearches();
}

// Load recent searches on page load
window.onload = () => {
  displayRecentSearches();
};
