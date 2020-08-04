// // const request = require('request')
// // const geocode = (address, callback) => {
// //     const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?types=address&access_token=pk.eyJ1Ijoic2FtYmhhdjY3ODciLCJhIjoiY2tjdnY3cXhrMDd5djJwcWxleXM0bXV4aiJ9.T6ZMptqk-g7-Nkacto0e5A"

// //     request({ url: url, json: true }, (error, response) => {
// //         if (error) {
// //             callback('unable to conect to location service')
// //         } else if (response.body.features.length === 0) {
// //             callback('Unable to find location', undefined)
// //         }
// //         else {
// //             callback(undefined, {
// //                 latitude: response.body.features[0].center[0],
// //                 longitude: response.body.features[0].center[1],
              
// //                 location: response.body.features[0].place_name
// //             })
// //         }
// //     })



// }
// module.exports=geocode


const request= require('request')

const geocode=(address,callback )=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYXJwaXRtYWxhaXlhIiwiYSI6ImNrOGsya3hxMDBuaWEza3FtdTg3djNuZ3YifQ.5hvjFcGCZLWTMjvvDzyMEQ&limit=1'
    request({url:url, json:true},(error,{body})=>{
        if (error){
            callback('Unable to connect to the weather service',undefined)
        }
        else if(body.features.length===0)
        {
            callback('Enter correct location',undefined)
        }
        else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }

    })
}

module.exports =geocode