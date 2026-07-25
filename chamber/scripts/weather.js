const apiKey = '1d076a66ac958c88f2186992101a8565'; 
const lat = '-16.72'; 
const lon = '-43.86';

const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function fetchWeather() {
    try {
        const response = await fetch(currentUrl);
        if (response.ok) {
            const data = await response.json();
            displayCurrentWeather(data);
        }

        const forecastResponse = await fetch(forecastUrl);
        if (forecastResponse.ok) {
            const forecastData = await forecastResponse.json();
            displayForecast(forecastData);
        }
    } catch (error) {
        console.error('Erro ao buscar clima:', error);
    }
}

function displayCurrentWeather(data) {
    const tempEl = document.getElementById('weather-temp');
    const descEl = document.getElementById('weather-desc');
    const iconEl = document.getElementById('weather-icon');

    if (tempEl) tempEl.innerHTML = `${Math.round(data.main.temp)}&deg;C`;
    if (descEl) descEl.textContent = data.weather[0].description;
    if (iconEl) iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

function displayForecast(data) {
    const forecastList = document.getElementById('weather-forecast');
    if (!forecastList) return;

    forecastList.innerHTML = '';

    const threeDays = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

    threeDays.forEach(day => {
        const date = new Date(day.dt * 1000).toLocaleDateString('pt-BR', { weekday: 'short' });
        const li = document.createElement('li');
        li.innerHTML = `<strong>${date}:</strong> ${Math.round(day.main.temp)}&deg;C - ${day.weather[0].main}`;
        forecastList.appendChild(li);
    });
}

fetchWeather();