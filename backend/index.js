const express = require('express')
const app = express()
const port = process.env.PORT || 5001
const axios = require('axios')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path');
const { nextTick } = require('process')

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res, next) => {
  axios.get('https://app.ticketmaster.com/discovery/v2/events.json?countryCode=CA&source=ticketmaster&apikey=gqt3xm5JcOR5QBigmIndcAkGGjQBPNGg')
    .then(events => {
      console.log(events)
      res.json(events.data._embedded.events);
    })
    .catch(error => {
      res.json('No available events');
    })
    next();
})

app.use(express.static(path.resolve(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

app.post('/local', (req, res) => {
  const {location } = req.body
  axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?city=${location}&stateCode=BC&source=ticketmaster&apikey=gqt3xm5JcOR5QBigmIndcAkGGjQBPNGg`)
    .then(events => {
      res.json(events.data._embedded.events);
    })
    .catch(error => {
      res.send('No available events');
    })
})

// app.use(express.static(path.join(__dirname, '/frontend/build')));

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, '/frontend/build', 'index.html'));
// });
app.use(express.static(path.resolve(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

