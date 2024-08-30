const input = document.querySelector('input');
const form = document.querySelector('.search');
const key = 'b10b069104fd1765b46354a9dcc40585'


form.addEventListener("submit", formHandler);
function formHandler(event) {
    event.preventDefault()
    let inputValue = (event.target.elements[0].value)
    fetchWeatherData(inputValue)
    event.target.elements[0].value = ''
}

function fetchWeatherData(inputValue){
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${key}&units=metric`
    showHideLoader('hide')
    fetch(url)
            .then(res=>res.json())
            .then(data=>{showData(data)})
            .catch(error=>console.log(error.message))
}



fetchWeatherData('mumbai')


function showData(data){
    showHideLoader("show")
    let weatherIconCode = data.weather[0].icon
    let weatherImageUrl = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`
 
    document.querySelector('.weathor-icon').src = weatherImageUrl;
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerText = data.main.temp;
        document.querySelector('.humidity').innerText = data.main.humidity + "%";
        document.querySelector('.wind').innerText = data.wind.speed + " m/s";
}

function showHideLoader(value){
    
    let loadingDiv = document.querySelector('.loading')
    let mainDiv = document.querySelector('.main')
    if(value=="show"){
        loadingDiv.classList.add('hidden')
        mainDiv.classList.remove('hidden')
    }
    else{
        loadingDiv.classList.remove('hidden')
        mainDiv.classList.add('hidden')
    }
}



