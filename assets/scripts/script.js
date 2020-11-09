// JQuery Code to display API call results
// EXS edwyn.saunders@outlook.com

console.log ("Inside Script");

// Auto page refresh every 5 minutes
setTimeout(function(){
    window.location.reload(1);
 }, 600000);


$ (document).ready(function(){

    const PUBLICMETROKEY = `e13626d03d8e4c03ac07f95541b3091b`; 
    const PUBLICWEATHERKEY = `f9c22785936f5fc5811e20fb8cb7e2fc`; // removed c from end
    const metroAPI = `https://api.wmata.com/Incidents.svc/json/Incidents?api_key=${PUBLICMETROKEY}`;
    const busAPI = `https://api.wmata.com/Incidents.svc/json/BusIncidents?api_key=${PUBLICMETROKEY}`;
    const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?zip=20500&units=imperial&appid=${PUBLICWEATHERKEY}`;

    // this section will need fixing to add a leading 0 when needed 
    let myTime = new Date();
    const currentTime = `${myTime.getHours()}:${myTime.getMinutes()}`;
    $('#lastUpdate').text(currentTime);

    const displayWeather = (weatherDetails) => {
        let weatherIcon = `<img src='http://openweathermap.org/img/wn/${weatherDetails.weather[0].icon}@2x.png' alt='Weather Icon'>`;
        // console.log (weatherDetails);
        // $('#weatherLat').text(weatherDetails.coord.lat)
        // $('#weatherLong').text(weatherDetails.coord.lon)
        $('#currentTemp').text(Math.round(weatherDetails.main.temp));
        $('#feelsLike').text(Math.round(weatherDetails.main.feels_like));
        $('#currentHumidity').text(weatherDetails.main.humidity);
        $('#forecastHigh').text(Math.round(weatherDetails.main.temp_max));
        $('#currentConditions').text(weatherDetails.weather[0].description);
        $('#currentWindSpeed').text(Math.round(weatherDetails.wind.speed));
        $('#currentWindDirection').text(weatherDetails.wind.deg);
        $('#weatherIcon').html(weatherIcon);
    }

    const displayMetroResults = (metroResults) => {
        if (metroResults.length === 0 ) {
            console.log ('Nothing to report')
        } else {
        console.log (`Metro Results: `, metroResults);
        // populate our metrodata table
        }

    }

    const displayBusResults = (busResults) => {
        
        if ( busResults.length === 0 ) {
            console.log ("Nothing to report")
        } else {
            console.log (`Bus Incidents: `, busResults);
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
            console.log (res);
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