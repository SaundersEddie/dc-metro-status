// JQuery Code to display API call results
// EXS edwyn.saunders@outlook.com

// Auto page refresh every 10 minutes
setTimeout(function(){
    window.location.reload(1);
 }, 600000);

$ (document).ready(function(){

    const PUBLICMETROKEY = `e13626d03d8e4c03ac07f95541b3091b`; 
    const PUBLICWEATHERKEY = `f9c22785936f5fc5811e20fb8cb7e2fc`;
    const metroAPI = `https://api.wmata.com/Incidents.svc/json/Incidents?api_key=${PUBLICMETROKEY}`;
    const busAPI = `https://api.wmata.com/Incidents.svc/json/BusIncidents?api_key=${PUBLICMETROKEY}`;
    const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?zip=20500&units=imperial&appid=${PUBLICWEATHERKEY}`;
    let myTime = new Date();
    const currentTime = `${myTime.getHours()}:${("0" + myTime.getMinutes()).slice(-2)}`;
    $('#lastUpdate').text(currentTime);

    const displayWeather = (weatherDetails) => {
        const weatherIcon = `<img src='https://openweathermap.org/img/wn/${weatherDetails.weather[0].icon}@2x.png' alt='Weather Icon'>`;
        $('#currentTemp').text(Math.round(weatherDetails.main.temp));
        $('#feelsLike').text(Math.round(weatherDetails.main.feels_like));
        $('#currentHumidity').text(weatherDetails.main.humidity);
        $('#forecastHigh').text(Math.round(weatherDetails.main.temp_max));
        $('#currentConditions').text(weatherDetails.weather[0].description.charAt(0).toUpperCase()+weatherDetails.weather[0].description.slice(1));
        $('#currentWindSpeed').text(Math.round(weatherDetails.wind.speed));
        $('#weatherIcon').html(weatherIcon);
    }

    const displayMetroResults = (metroResults) => {
        if (metroResults.length === 0 ) {
            $("#metroData").append(`<tr><td>No Delays To Report</td></tr>`);
        } else {
            metroResults.forEach(element => {
                $("#metroData").append(`<tr><td>${element.LinesAffected.replace(/;/g, "")}</td><td>${element.IncidentType}</td><td>${element.Description}</td></tr>`);
            });
        }
    }
    const displayBusResults = (busResults) => {
        if ( busResults.length === 0 ) {
            $("#busData").append(`<tr><td>No Delays To Report</td></tr>`);
        } else {
            busResults.forEach(element => {
                myRoutes = element.RoutesAffected.join();
                $("#busData").append(`<tr><td>${myRoutes}</td><td>${element.IncidentType}</td><td>${element.Description}</td></tr>`);
            });
        }
    }
    const busResults = () => {
        $.get(
            {
                url: busAPI,
            })
            .done ( function (res) {
                displayBusResults(res.BusIncidents);
            })
            .fail (function (error) {
                console.log(error);
            })
    }

    const metroResults = () => {
        $.get(
            {
                url: metroAPI,
            })
        .then (function (res) {
            displayMetroResults(res.Incidents);
        })
    }

    const weatherResults = () => {
        $.get(
            {
                url: weatherAPI,
            })
        .then (function (res) {
            displayWeather(res);
        })
    }
    
    busResults();
    metroResults();
    weatherResults();
    // No code beyond here, end of JQuery
});