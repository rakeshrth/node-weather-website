const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//in the above line, we are creating a variable to store the public directory path,
//so that it is easier to use in app.use.

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')   
app.set('views', viewsPath) //this is used to change path of views folder to another, here ie templates
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Rakesh T'
    })

})


app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'about me',
        name: 'Rakesh'
    })
})

app.get('/help', (req,res) =>{
    res.render('help', {
        helpText: 'This is a help text...',
        title: 'Help page',
        name: 'Rakesh T'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }
    //here below we give an empty array for lat,long and loc to prevent undefined error n crash the server. this is mandatory.
    geocode(req.query.address,(error,{latitude,longitude,location} ={}) =>{
        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(latitude,longitude, (error,forecastData) =>{
            if (error){
                return res.send({
                    error:error
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address:req.query.address
            })
        })
    })

    // res.send({
    //     forecast: 'this is forecast',
    //     location: 'this is location',
    //     address: req.query.address
    // })
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error:' You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

//here we send a seperate page so that if anyone goes to /help/undefined url, it will give a response.
app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'rakesh T',
        errorMessage: 'Help article not found.'
    })
})


//setting 404 page.always put the code last, above app.listen... * is the wildcard character, means no match
app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Rakesh T',
        errorMessage: 'Page not found'
    })
})


app.listen(port, () => {
    console.log('server is up on port' + port)
})




// app.get('', (req, res) => {
//     res.send('<h1>Weather app</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send({
//         name: 'andrew',
//         age: 27
//     })
// })
