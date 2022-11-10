$(document).ready;
const API_KEY = 'a22913bc70f5fe7ee10c9e482a3928e9';
const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#cityName');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const tempMax = document.querySelector('#Max')
const tempMin = document.querySelector('#Min')
var cityName;
console.log('cityName', cityName);
var currentTime = moment().format('H'); 
var time = moment();
var currenthour = moment().hours();
// console.log ("currenthour", currenthour)
var base = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + API_KEY;
console.log('success')

$(document).ready(function() {
            $('#currentDay').html(moment().format('dddd, MMMM Do YYYY'));

            //  iconImg.src = ("http://openweathermap.org/img/wn/$%7Bicon%7D@2x.png");

            window.addEventListener('load', () => {
                let long;
                let lat;
                // Accessing Geolocation of User
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        // Storing Longitude and Latitude in variables
                        long = position.coords.longitude;
                        lat = position.coords.latitude;
                        //console.log('success')
                    });
                }
            });

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    // Storing Longitude and Latitude in variables
                    long = position.coords.longitude;
                    lat = position.coords.latitude;
                    console.log('lat', lat,'long', long)
                    const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=a22913bc70f5fe7ee10c9e482a3928e9&units=imperial`;
                    // Using fetch to get data
                    fetch(base)
                        .then((response) => {
                            // A fetch request is made to base (URL from above). Data about the weather is returned to us
                            // and the data is called response.  This is just a variable name, 'response' could be called anything.
                            return response.json();
                        })
                        .then((data) => {
                            // the 'data' is the raw JSON data returned about the weather in my location. Remeber, you can see this data in the console.
                            console.log('data', data)
                            // now that we have the raw data, we need to parse it to separate out the stuff we care about inside of it
                           
                            // Erich's example of how to get temp_max
                            const weatherdescription = data.weather[0].description
                            const temp_max = data.main.temp_max
                            console.log(temp_max)
                            const temp_min = data.main.temp_min
                            console.log(temp_min)
                            const humidity = data.main.humidity
                            console.log(humidity)
                            const windSpeed = data.wind.speed
                            console.log(windSpeed)
                        // now lets put our data on the page
                            let weather = document.getElementsByClassName('temp');
                            console.log('weather', weather)
                            weather[0].innerHTML = 'High: ' + temp_max + '°F';
                            // weather[0].innerHTML = `Temp Max: ${temp_max}°F`;    // another way of doing the same
                            weather[1].innerHTML = 'Low: ' + temp_min + '°F';
                            let humidityhtml = document.querySelector('#Humidity1')
                            humidityhtml.innerHTML = 'Humidity: ' + humidity + '%';
                            let windspeedhtml = document.querySelector('#Wind1')
                            windspeedhtml.innerHTML = 'Wind Speed: ' + windSpeed + ' MPH';

                            // const forecasturl = `https://api.openweathermap.org/data/2.5/forecast?lat=35.4986206&lon=-82.5163212&appid=a22913bc70f5fe7ee10c9e482a3928e9`;
                            const fivedayforecasturl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=a22913bc70f5fe7ee10c9e482a3928e9&units=imperial`;
                            fetch(fivedayforecasturl)
                            .then((response) => {
                                return response.json();
                            })
                        .then((data) => {
                             //console.log('data', data)
                             const {
                                temp_max
                            } = data.main;
                            const {
                                temp_min
                            } = data.main;
                            const place = data.name;
                            const {
                                description,
                                icon
                            } = data.weather[0];

                             let weather2 = document.getElementById('max2');
                             //console.log('weather', weather)
                            weather2.innerHTML = temp_max
                            weather[1].innerHTML = temp_min  
                                

                            })

                        });
                })
              }
              
            })