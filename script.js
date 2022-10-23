const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentweatheritemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const API_KEY = 'f2de33693005b8e59b80a294e9179182';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HourFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : "AM"

    // timeEl.innerHTML = hoursIn12HrFormat + ':' + minutes+ '' + ''
    // <span id="am-pm">${ampm}</span>

    dateEl.innerHTML = days[day] + ',' + date+ '' + months[month];
},1000);

getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => { 
        let {latitude, longitude} = success.coords;
        console.log(success)
        // fetch(api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid={API_KEY}).then(res => res.json()).then(data => {
            // console.log(data)
        })
    // })
}