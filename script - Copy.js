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
                        console.log('success')
                    });
                }
            });

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    // Storing Longitude and Latitude in variables
                    long = position.coords.longitude;
                    lat = position.coords.latitude;
                    const base = `https://api.openweathermap.org/data/2.5/weather?lat=35.4986206&lon=-82.5163212&appid=a22913bc70f5fe7ee10c9e482a3928e9&units=metric`;

                    // Using fetch to get data
                    fetch(base)
                        .then((response) => {
                            return response.json();
                        })
                        .then((data) => {
                            console.log('data', data)
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
                        });
                })
              }
            })