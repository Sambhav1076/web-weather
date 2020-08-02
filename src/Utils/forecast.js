const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=89fc86cf2f8ff4e36d617e2b331d6d5e&query=" + latitude + "," + longitude + "&unit=f"
    request({ url: url, json: true }, (error, response) => {

        if (error) {
            callback('Unable toconnect to weather service', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        }
        else {
            callback(undefined,  response.body.current.temperature +'It is currently'  + 'degree out .'  + response.body.current.precip +'It feels like' + response.body.location.name)
        }



    })


}
module.exports = forecast