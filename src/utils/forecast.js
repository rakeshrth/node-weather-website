const request = require('request')

// **************************with object destructuring and es6 shorthand
// const forecast = (latitude,longitude,callback) => {
//     const urlw = 'https://api.darksky.net/forecast/3d1e48185e25cf02c736fc3837f4918b/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si'

//     request({urlw, json: true}, (error, { body }) => {
//         if (error) {
//             callback('unable to connect to weather services', undefined)
//         } else if (body.error) {
//             callback('unable to find location', undefined)
//         } else {
//             callback(undefined, body.daily.data[0].summary + ' it is currently ' + body.currently.temperature + ' degrees out.there is a ' + body.currently.precipProbability + '% chance of rain.')
//         }
//     })
// }

// module.exports = forecast

// ****************************without es6 shorthand and object destructuring
const forecast = (lat,long,callback) => {
    const urlw = 'https://api.darksky.net/forecast/3d1e48185e25cf02c736fc3837f4918b/' + encodeURIComponent(lat) + ',' + encodeURIComponent(long) + '?units=si'

    request({url: urlw, json: true},(error,response) => {
        if (error) {
            callback('unable to connect to weather services', undefined)
        } else if (response.body.error) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined, response.body.daily.data[0].summary + ' it is currently ' + response.body.currently.temperature + ' degrees out.there is a ' + response.body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast