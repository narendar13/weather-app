const api = {
    key: "39a634d9721d62225080a8a0337dd74b",
    baseurl: 'https://api.openweathermap.org/data/2.5/weather'
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery)

function setQuery(e) {
    if (e.keyCode === 13) {
        getResults(searchbox.value)

    }
}
function getResults(query) {
    fetch(`${api.baseurl}?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults)
}
function displayResults(weather) {
    let city = document.querySelector('.location .city')
    city.innerText = `${weather.name},${weather.sys.country}`

    let now = new Date();
    let date = document.querySelector('.location .date')
    date.innerText = dateBuilder(now)

    let temp = document.querySelector('.current .temp')
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>&degC</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerHTML = `${Math.round(weather.main.temp_min)}<span>&degC</span> / ${Math.round(weather.main.temp_max)}<span>&degC</span>`
}
function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
        "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()]
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}