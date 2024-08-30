const form = document.querySelector('form');
let cityNameInput = document.querySelector('#search');
const key = 'b10b069104fd1765b46354a9dcc40585';
const mainDiv = document.querySelector('.main');
const loadingDiv = document.querySelector('.loading');

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    fetchWeatherData(cityNameInput.value);
})

function fetchWeatherData(cityNameInput){
    mainDiv.classList.add('hidden'); //content
    loadingDiv.classList.remove('hidden'); //loader

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityNameInput}&appid=${key}&units=metric`;

    fetch(url)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return showWeather(data);
        })
        .catch((error) => {
            console.log(error.message);
        })   
}

fetchWeatherData('jodhpur');


function showWeather(data) {
    
    mainDiv.classList.remove('hidden');
    loadingDiv.classList.add('hidden');
   

    let weatherDataIcon = data.weather[0].icon;
    let weatherImageUrl = `https://openweathermap.org/img/wn/${weatherDataIcon}@2x.png`;
    document.querySelector('.weathor-icon').src = weatherImageUrl;
    document.querySelector('.weather-description').innerText = data.weather[0].description;

    console.log(data);
    document.querySelector('.temp').innerText = data.main.temp + "°c";
    document.querySelector('.city').innerText = data.name;
    document.querySelector('.humidity').innerText = data.main.humidity + "%";
    document.querySelector('.wind').innerText = data.wind.speed + "m/s";
    cityNameInput.value = ""
    
}


