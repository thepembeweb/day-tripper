import { getDarkSkyData } from './api/darksky'
import { getGeoNamesData } from './api/geonames'
import { getPixaBayData } from './api/pixabay'
import { getRestCountriesData } from './api/restcountries'

const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const express = require('express')
const path = require('path')

dotenv.config()

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())

app.use(express.static('dist'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist', 'index.html'))
})

app.get('/search', async (req, res) => {
  try {
    const { date, destination } = req.query
    const geoNamesResponse = await getGeoNamesData(destination)

    const { countryCode, lat, lng } = geoNamesResponse.data
    const darkSkyResponse = await getDarkSkyData(date, lat, lng)
    const pixaBayResponse = await getPixaBayData(destination)
    const restCountriesResponse = await getRestCountriesData(countryCode)

    return res.json({
      success: true,
      data: {
        geoNames: geoNamesResponse.data,
        darkSky: darkSkyResponse.data,
        pixaBay: pixaBayResponse.data,
        restCountries: restCountriesResponse.data,
        date
      }
    })
  } catch (error) {
    console.error(error)

    return res.json({
      success: false,
      data: {
        geoNames: null,
        darkSky: null,
        pixaBay: null,
        restCountries: null,
        date: null
      }
    })
  }
})

module.exports = app
