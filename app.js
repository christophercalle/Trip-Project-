const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const PORT = 3000
const bodyParser = require('body-parser')


app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('client'))



let destination = 'houston'
let departureDate = '05-08-2912'
let returnDate = '05-08-5000'
let postURL = 'https://rlv.zcache.com/denver_colorado_large_letter_scenes_postcard-r119c8b92e2c14f54b6d04a7fec4a64a7_vgbaq_8byvr_200.jpg'

let trips = [{destination: destination, departureDate: departureDate, returnDate: returnDate, postURL: postURL  }]

app.use(bodyParser.json())

app.get('/', function(req,res){
    res.render('index' , {trips : trips})
})


app.post('/add-trip', function(req, res){

    let destination = req.body.destination
    let departureDate = req.body.departureDate
    let returnDate = req.body.returnDate
    let postURL = req.body.postURL
    
    let newTrip = {destination: destination, departureDate: departureDate , returnDate: returnDate , postURL: postURL}
    
    console.log(newTrip)
    trips.push(newTrip)
    res.redirect('/')
})



app.post('/remove-trip',function(req,res){

  let destination  = req.body.destination

  trips = trips.filter(function(destination){
    return trips.destination != destination
  })

  res.render('remove-destination',{destination : destination})
})



app.listen(PORT, function(){
    console.log("Server has started!")
})