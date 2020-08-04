// const request = require('request')

// const forecast = (latitude, longitude, callback) => {
//     const url = "http://api.weatherstack.com/current?access_key=89fc86cf2f8ff4e36d617e2b331d6d5e&query=" + latitude + "," + longitude + "&unit=f"
//     request({ url: url, json: true }, (error, response) => {

//         if (error) {
//             callback('Unable toconnect to weather service', undefined)
//         } else if (response.body.error) {
//             callback('Unable to find location', undefined)
//         }
//         else {
//             callback(undefined,  response.body.current.temperature +'It is currently'  + 'degree out .'  + response.body.current.precip +'It feels like' + response.body.location.name)
//         }



//     })


// }
// module.exports = forecast





const request= require('request')

const forecast =(latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/094c7966ea6f4c1de807cd7647ad2a4f/' + latitude + ','+ longitude +'?units=si'
    request({ url, json: true }, (error, {body}) => {
    
            if(error){
                callback( 'Unable to connect to the weather service',undefined )
            }
            else if(body.error){
                callback( 'Unable to find location',undefined )
            }
            else{
                callback(undefined,body.daily.data[0].summary+ ' It is currently '+
                     (body.currently.temperature) + ' degrees out. There is a '+
                      (body.currently.precipProbability)+ ' % chance of rain.')
            }
        })

}
module.exports =forecast