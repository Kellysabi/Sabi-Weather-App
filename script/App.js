// app.js

// Instantiate WeatherService class
const weatherService = new WeatherService();

// UI elements
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

// Function to update the UI
const updateUI = (data) => {
    const { cityDetail, country, weather, localTime, temp, dayTime, iconSrc } = data;

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

    icon.setAttribute('src', `https:${iconSrc}`);
    const timeSrc = dayTime.is_day ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);
    card.classList.remove('d-none');
}

// Function to get city and weather details and pass them to updateUI
const updateCity = async (city) => {
    try {
        const cityDetail = await weatherService.getCity(city);
        const cityWeather = await weatherService.getWeather(cityDetail.name);

        return {
            cityDetail: cityDetail.name,
            country: cityDetail.country,
            weather: cityWeather.current.condition.text,
            localTime: cityWeather.location.localtime,
            temp: cityWeather.current.temp_c,
            dayTime: cityWeather.current,
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
    const city = cityForm.city.value.trim();
    cityForm.reset();
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
    localStorage.setItem('searchCity', city);
});

// Check local storage for last searched city on page load
if (localStorage.getItem('searchCity')) {
    updateCity(localStorage.getItem('searchCity'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}
