document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '61129da131da5da21f7ec54b374686cd';
    const searchForm = document.getElementById('search-form');
    const weatherInfo = document.getElementById('weather-info');
    const errorElement = document.getElementById('error-message');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission behavior

        const formData = new FormData(searchForm);
        const cityInput = formData.get('city').trim();
        if (cityInput === '') {
            displayErrorMessage('Please enter a city name.');
            return;
        }

        const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityInput + '&units=metric&appid=' + apiKey;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(data => {
                displayWeatherInfo(data);
                clearErrorMessage();
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                displayErrorMessage('City not found. Please enter a valid city name.');
            });
    });

    function displayWeatherInfo(data) {
        weatherInfo.style.display = 'block';
        const locationElement = document.getElementById('location');
        const temperatureElement = document.getElementById('temperature');
        const descriptionElement = document.getElementById('description');
        const humidityElement = document.getElementById('humidity');
        const windSpeedElement = document.getElementById('wind-speed');

        locationElement.textContent = data.name + ', ' + data.sys.country;
        temperatureElement.textContent = data.main.temp.toFixed(1) + '°C';
        descriptionElement.textContent = data.weather[0].description;
        humidityElement.textContent = data.main.humidity + '%';
        windSpeedElement.textContent = data.wind.speed.toFixed(1) + ' km/h';
    }

    function displayErrorMessage(message) {
        weatherInfo.style.display = 'none';
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function clearErrorMessage() {
        errorElement.style.display = 'none';
    }
});
