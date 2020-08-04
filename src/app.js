
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode=require('./Utils/geocode')
const forecast= require('./Utils/forecast')

// console.log(__dirname)
// //console.log(__filename)
// console.log(path.join(__dirname, '../..'))
// console.log(path.join(__dirname, '../public'))







const app = express()
const port = process.env.PORT || 3000
//Define paths for Express confiquration
const publicdirectorypath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicdirectorypath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        City: "Jhanxi",
        name:"Sambhav Jain"
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        city: "Jhansi",
        name:"Sambhav Jain"

    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        city: "Jhansi",
        name:"Sambhav Jain"

    })
})



app.get('/weather', (req, res) => {
     if(!req.query.address){
       return  res.send({
             error:"Enter Valid Address Field"
         })
     }

       geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if(error){
                return res.send({error})
            }
         forecast(latitude,longitude,(error,forecastData)=>{
             if(error){
                 return res.send({error})
             }
             res.send({
                 forecast:forecastData,
                 location,
                 address:req.query.address
             })
         })

       })


})

    // res.send({
    //     forecast: "It is snowing",
    //     location: "jhansi",
    //     address: req.query.address

    // })


app.get('/products',(req,res)=>{
   if(!req.query.search){
     return res.send({
         error:"You Must provide the Best Search Term"
     })
   }
   console.log(req.query.search)
    res.send({
        products:[]
    })
})



app.get('/help/*',(req,res)=>{
    res.render('404',{
        errormessage:"Help Package Not Found",
        name:"Sambhav Jain"
    })
})

app.get('*', (req, res) => {
   res.render('404',{
       errormessage:"404 Not Found",
       name:"Sambhav Jain"
   })    //* is wild card character .on giving different url on browser,it will be compared with other route 
})



// app.get('', (req, res) => {
//     res.send("<h1>Hello Express!</h1>")
// })

// app.get('/help', (req, res) => {
//     res.send({
//         name: "Sambhav Jain",
//         Location: "jhansi"
//     })
// })


// app.get('/about', (req, res) => {
//     res.send("<h1>Abouts</h1>")
// })


//app.com
//app.com/help
//app.com/about

//This will start our server and 3000 is the port
app.listen(port, () => {
    console.log("Server is up 3000!"+ port)
})



