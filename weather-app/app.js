const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

if(process.argv.length < 3){
    return console.log("Mention a location in your input arg");
}

const inputQuery = process.argv[2];

geocode(inputQuery, (error, {lat, long, location}) => {
    if(error){
        return console.log("Error ", error);
    }
    forecast(lat, long, (error, forecastData) => {
        if(error){
            return console.log("Error ", error);
        }
        console.log("Data ", location);
        console.log("Data ", forecastData);
    })
})