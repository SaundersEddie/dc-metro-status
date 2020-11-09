// JQuery Code to display API call results
// EXS edwyn.saunders@outlook.com

console.log ("Inside Script");

$ (document).ready(function(){

    const PUBLICMETROKEY = `e13626d03d8e4c03ac07f95541b3091b`;
    const PUBLICWEATHERKEY = `f9c22785936f5fc5811e20fb8cb7e2fc`
    const metroAPI = `https://api.wmata.com/Incidents.svc/json/Incidents?api_key=${PUBLICMETROKEY}`;
    const busAPI = `https://api.wmata.com/Incidents.svc/json/BusIncidents?api_key=${PUBLICMETROKEY}`;
    const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?zip=20500&units=imperial&appid=${PUBLICWEATHERKEY}`;

    console.log (metroAPI);
    console.log (busAPI);
    console.log (weatherAPI);

    const busResults = () => {
        console.log ("Inside Bus Results function")
        $.ajax(
            {
                url: busAPI,
                method: "GET"
            })
        .then (function (res) {
            console.log (res);
        })
    }

    busResults();


    // No code beyond here, end of JQuery
});