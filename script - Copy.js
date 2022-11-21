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


// for fun challenge: figure out how to get 'better' dates than today, tomorrow, etc
// a way to do this would be to look at the moment.js docs and see if there's a way to get the day of the week
// then you can write those days into the html




const locationButton = document.querySelector('#locationButton');
locationButton.addEventListener('click', () => { 
//    get text from search box
    var cityName = document.querySelector('#cityInput').value;
// change cityName id to show name of city on page
    var currentCity = document.querySelector('#cityName');
    currentCity.innerHTML = cityName;


    // take city name and make ApI call for weather in that city
    var base = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + API_KEY + "&units=imperial";   
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
        // console.log('weather', weather)
        weather[0].innerHTML = 'High: ' + temp_max + '°F';
        // weather[0].innerHTML = `Temp Max: ${temp_max}°F`;    // another way of doing the same
        weather[1].innerHTML = 'Low: ' + temp_min + '°F';
        let humidityhtml = document.querySelector('#Humidity1')
        humidityhtml.innerHTML = 'Humidity: ' + humidity + '%';
        let windspeedhtml = document.querySelector('#Wind1')
        windspeedhtml.innerHTML = 'Wind Speed: ' + windSpeed + ' MPH';

        // const forecasturl = `https://api.openweathermap.org/data/2.5/forecast?lat=35.4986206&lon=-82.5163212&appid=a22913bc70f5fe7ee10c9e482a3928e9`;
        const fivedayforecasturl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=a22913bc70f5fe7ee10c9e482a3928e9&units=imperial`;

        fetch(fivedayforecasturl)
        .then((response) => {
            return response.json();
        })
    .then((data) => {
        console.log('data', data)
        const futureweather = data.list
        const futuretempmax = []   // this collects each max temp at noon for five day forecast
        // console.log('futuretempmax', futuretempmax)

        //gather min temps
        const futuretempmin = []   // this collects each min temp at noon for five day forecast
        // console.log('futuretempmin', futuretempmin)
        //gather humiditys
        const futurehumidity = []   // this collects each humidity at noon for five day forecast
        //gather wind speeds
        const futurewindspeed = []   // this collects each wind speed at noon for five day forecast

        // there are 40 weather calls and we need to loop over them
            for (let i = 0; i < futureweather.length; i++) {
                // we only want the weather at 12:00pm
                // i learned that at noon, the min temp and max temp are the same. 
                //So I will use the temp at 9am as the min temp. I will also use the wind speed and humidity from 9am as repreeseting the whole day
                if (futureweather[i].dt_txt.includes("09:00:00")) {
                    // find min temp
                    futuretempmin.push(futureweather[i].main.temp_min)
                    console.log('min temp at 9am', futureweather[i].main.temp_min)
                    
                    // find humidity
                    futurehumidity.push(futureweather[i].main.humidity)
                    // find wind speed
                    futurewindspeed.push(futureweather[i].wind.speed)
                }

                // i will use the max temp at 3pm for the day
                if (futureweather[i].dt_txt.includes("15:00:00")) {
                    // find max temp
                    futuretempmax.push(futureweather[i].main.temp_max)
                    console.log('max temp at 3pm', futureweather[i].main.temp_max)
                }
            }
        // now we will put our temp max info into the html
        const tomorrowtempmax = document.querySelector('#Max2')
        const twodaysmaxtemp = document.querySelector('#Max3')
        const threedaysmaxtemp = document.querySelector('#Max4')
        const fourdaysmaxtemp = document.querySelector('#Max5')
        tomorrowtempmax.innerHTML = 'High: ' + futuretempmax[0] + '°F';
        twodaysmaxtemp.innerHTML = 'High: ' + futuretempmax[1] + '°F';
        threedaysmaxtemp.innerHTML = 'High: ' + futuretempmax[2] + '°F';
        fourdaysmaxtemp.innerHTML = 'High: ' + futuretempmax[3] + '°F';

        // now we will put our temp min info into the html
        const tomorrowtempmin = document.querySelector('#Min2')
        const twodaysmintemp = document.querySelector('#Min3')
        const threedaysmintemp = document.querySelector('#Min4')
        const fourdaysmintemp = document.querySelector('#Min5')
        tomorrowtempmin.innerHTML = 'Low: ' + futuretempmin[0] + '°F';
        twodaysmintemp.innerHTML = 'Low: ' + futuretempmin[1] + '°F';
        threedaysmintemp.innerHTML = 'Low: ' + futuretempmin[2] + '°F';
        fourdaysmintemp.innerHTML = 'Low: ' + futuretempmin[3] + '°F';

        // now we will put our humidity info into the html
        const tomorrowhumidity = document.querySelector('#Humidity2')
        const twodayshumidity = document.querySelector('#Humidity3')
        const threedayshumidity = document.querySelector('#Humidity4')
        const fourdayshumidity = document.querySelector('#Humidity5')
        tomorrowhumidity.innerHTML = 'Humidity: ' + futurehumidity[0] + '%';
        twodayshumidity.innerHTML = 'Humidity: ' + futurehumidity[1] + '%';
        threedayshumidity.innerHTML = 'Humidity: ' + futurehumidity[2] + '%';
        fourdayshumidity.innerHTML = 'Humidity: ' + futurehumidity[3] + '%';

        // now we will put our wind speed info into the html
        const tomorrowwindspeed = document.querySelector('#Wind2')
        const twodayswindspeed = document.querySelector('#Wind3')
        const threedayswindspeed = document.querySelector('#Wind4')
        const fourdayswindspeed = document.querySelector('#Wind5')
        tomorrowwindspeed.innerHTML = 'Wind Speed: ' + futurewindspeed[0] + ' MPH';
        twodayswindspeed.innerHTML = 'Wind Speed: ' + futurewindspeed[1] + ' MPH';
        threedayswindspeed.innerHTML = 'Wind Speed: ' + futurewindspeed[2] + ' MPH';
        fourdayswindspeed.innerHTML = 'Wind Speed: ' + futurewindspeed[3] + ' MPH';
    });

    });



})



              
            