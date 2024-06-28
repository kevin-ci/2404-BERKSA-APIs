const apiKey = "7816d9f235c88adc096427a68ca872f2";
const units = "metric";
const apiFunction = "forecast";

const cityNameElement = document.getElementById("city-name");
const imageElement = document.getElementById("image");
const headlineElement = document.getElementById("headline-condition");
const conditionElement = document.getElementById("sub-condition");
const temperatureElement = document.getElementById("temp");
const humidityElement = document.getElementById("humidity");
const cloudsElement = document.getElementById("clouds");
const windspeedElement = document.getElementById("speed");
const directionElement = document.getElementById("direction");
const forecastElement = document.getElementById("forecast");

const buttonElement = document.getElementById("submit");
const inputElement = document.getElementById("input");
buttonElement.addEventListener('click', handleClick);

function handleClick() {
    forecastElement.innerHTML = "";
    const userInput = inputElement.value;
    const apiURL = `https://api.openweathermap.org/data/2.5/${apiFunction}?q=${userInput}&appid=${apiKey}&units=${units}`;
    fetch(apiURL)
    .then(function (response) {
        return response.json();
    }).then(function (object) {
        console.log(object);
        cityNameElement.innerText = object.city.name;

        const imageCode = object.list[0].weather[0].icon;
        const imageUrl = `https://openweathermap.org/img/wn/${imageCode}@2x.png`;
        imageElement.src = imageUrl;

        headlineElement.innerText = object.list[0].weather[0].main;
        conditionElement.innerText = object.list[0].weather[0].description;
        temperatureElement.innerText = object.list[0].main.temp;
        humidityElement.innerText = object.list[0].main.humidity;
        cloudsElement.innerText = object.list[0].clouds.all;
        windspeedElement.innerText = object.list[0].wind.speed;
        directionElement.innerText = getCardinalDirection(object.list[0].wind.deg);


        for (let i = 7; i < 40; i+=8) {
            const dailyImageCode = object.list[i].weather[0].icon;
            const dailyImageUrl = `https://openweathermap.org/img/wn/${dailyImageCode}@2x.png`;
            const headline = object.list[i].weather[0].main;
            const condition = object.list[i].weather[0].description;
            const temperature = object.list[i].main.temp;
            const humidity = object.list[i].main.humidity;
            const clouds = object.list[i].clouds.all;
            const windspeed = object.list[i].wind.speed;
            const direction = getCardinalDirection(object.list[i].wind.deg);

            const timeStamp = object.list[i].dt;
            const dateTime = new Date(timeStamp * 1000);
            const dayOfWeek = dateTime.toLocaleDateString("en-GB", { weekday: 'long' }); 

            const html = `
            <div class="col">
                <h3>${dayOfWeek}</h3>
                <img src="${dailyImageUrl}">
                <h3>${headline} (${condition})</h3>
                <h4>Temperature: ${temperature}°C</h4>
                <h5>Humidity: ${humidity}%</h5>
                <h5>Wind: ${windspeed}m/s ${direction}</h5>
                <h5>Cloud Coverage: ${clouds}%</h5>
            </div>
            `;
            forecastElement.innerHTML += html;

        }

    });
}






    function getCardinalDirection(degree) {    
        const directions = [
            'N', 'NE', 'E', 'SE',
            'S', 'SW', 'W', 'NW',
        ];
    
        const index = Math.round(degree / 45) % 8;
        return directions[index];
    }