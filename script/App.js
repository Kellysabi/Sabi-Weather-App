// app.js

// Instantiate WeatherService class with your API key
const weatherService = new WeatherService('bfbce5fd05f74eefbdc230719241809');

// UI elements
const cityForm = document.querySelector('form');
const card = document.querySelector('.card'); // Assuming 'card' is a class
const details = document.querySelector('.details'); // Assuming 'details' is a class
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img'); // Assuming there's an img tag inside the icon class

// Function to update the UI
const updateUI = (data) => {
    // Destructure properties from data object
    const { cityDetail, country, weather, localTime, temp, dayTime, iconSrc } = data;

    // Display city details and weather info in the DOM
    details.innerHTML = `
        <h5 class="my-3">${cityDetail}</h5>
        <div class="my-3">${country}</div>
        <div class="my-3">${localTime}</div>
        <div class="my-3">${weather}</div>
        <div class="display-3 my-4">
            <span>${temp}</span>
            <span>°C</span>
        </div>   
    `;

    // Update the weather icon
    icon.setAttribute('src', `https:${iconSrc}`);

    // Set the correct time of day image (day/night)
    const timeSrc = dayTime.is_day ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);

    // Remove 'd-none' class to display the card
    card.classList.remove('d-none');
}

// Function to get city and weather details and pass them to updateUI
const updateCity = async (city) => {
    try {
        // Fetch city details using the city name
        const cityDetail = await weatherService.getCity(city);

        // Use the city name to fetch weather details
        const cityWeather = await weatherService.getWeather(cityDetail.name);

        // Return data formatted for UI
        return {
            cityDetail: cityDetail.name,
            country: cityDetail.country,
            weather: cityWeather.current.condition.text,
            localTime: cityWeather.location.localtime,
            temp: cityWeather.current.temp_c,
            dayTime: cityWeather.current,  // Pass the current object to check if it's day or night
            iconSrc: cityWeather.current.condition.icon
        };
    } catch (err) {
        console.error('Error updating city:', err);
        throw err;
    }
}

// Form submission event listener
cityForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get the city name from input
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // Update city and weather details and UI
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    // Store city in local storage
    localStorage.setItem('searchCity', city);
});

// Check local storage for last searched city on page load
if (localStorage.getItem('searchCity')) {
    updateCity(localStorage.getItem('searchCity'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}
