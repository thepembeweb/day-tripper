import * as utils from './utils'

const arrivalDateInput = document.getElementById('arrivalDateInput')
const tripDetailsCard = document.getElementById('tripDetailsCard')
const tripCardImage = document.getElementById('tripCardImage')
const tripCardTitle = document.getElementById('tripCardTitle')
const tripCardSubTitle = document.getElementById('tripCardSubTitle')
const tripCardText = document.getElementById('tripCardText')
const tripCardInfoCardWeatherImage = document.getElementById(
  'tripCardInfoCardWeatherImage'
)
const tripCardInfoCardWeatherTitle = document.getElementById(
  'tripCardInfoCardWeatherTitle'
)
const tripCardInfoCardWeatherFeelsLike = document.getElementById(
  'tripCardInfoCardWeatherFeelsLike'
)
const tripCardInfoCardWeatherLow = document.getElementById(
  'tripCardInfoCardWeatherLow'
)
const tripCardInfoCardWeatherHigh = document.getElementById(
  'tripCardInfoCardWeatherHigh'
)
const tripCardInfoCardWeatherWind = document.getElementById(
  'tripCardInfoCardWeatherWind'
)
const tripCardInfoCardWeatherHumidity = document.getElementById(
  'tripCardInfoCardWeatherHumidity'
)
const tripCardInfoCardWeatherUVIndex = document.getElementById(
  'tripCardInfoCardWeatherUVIndex'
)
const tripCardInfoCardWeatherDew = document.getElementById(
  'tripCardInfoCardWeatherDew'
)
const tripCardInfoCardWeatherCloudCover = document.getElementById(
  'tripCardInfoCardWeatherCloudCover'
)
const tripCardInfoCardWeatherPressure = document.getElementById(
  'tripCardInfoCardWeatherPressure'
)
const tripCardInfoCardCountryImage = document.getElementById(
  'tripCardInfoCardCountryImage'
)
const tripCardInfoCardPopulation = document.getElementById(
  'tripCardInfoCardPopulation'
)
const tripCardInfoCardDemonym = document.getElementById(
  'tripCardInfoCardDemonym'
)

export const displayTrip = data => {
  clearTrip()
  if (
    data.geoNames &&
    data.geoNames.destination &&
    data.geoNames.countryName &&
    data.date
  ) {
    tripCardInfoCardCountry.innerText = data.geoNames.countryName
    tripCardTitle.innerHTML = `<span>My trip to ${utils.titleCase(
      data.geoNames.destination
    )}</span><span>${data.geoNames.countryName.toUpperCase()}</span>`
    tripCardSubTitle.innerText = `Departing on ${utils.formatDate(data.date)}`
    tripCardText.innerText = `Hi there! Your trip is ${utils.getNumberOfDaysUntil(
      data.date
    )} days away 😀`
  }

  if (
    data.darkSky &&
    data.darkSky.daily.data &&
    data.darkSky.daily.data.length > 0
  ) {
    const dayData = data.darkSky.daily.data[0]

    if (dayData.icon) {
      tripCardInfoCardWeatherImage.src = `https://darksky.net/images/weather-icons/${dayData.icon}.png`
      tripCardInfoCardWeatherImage.alt = dayData.icon.replace(/-/g, ' ')
      tripCardInfoCardWeatherImage.title = dayData.icon.replace(/-/g, ' ')
    }

    tripCardInfoCardWeatherTitle.innerText =
      dayData.summary !== undefined
        ? dayData.summary
        : 'Forecast will be more accurate closer to the date'
    tripCardInfoCardWeatherFeelsLike.innerText = `Feels Like: ${utils.getApparentTemperature(
      dayData.apparentTemperatureMin,
      dayData.apparentTemperatureMax
    )}˚`
    tripCardInfoCardWeatherLow.innerText = `Low: ${Math.round(
      dayData.temperatureMin
    )}˚`
    tripCardInfoCardWeatherHigh.innerText = `High: ${Math.round(
      dayData.temperatureMax
    )}˚`
    tripCardInfoCardWeatherWind.innerText = `Wind: ${Math.round(
      dayData.windSpeed
    )} mph`
    tripCardInfoCardWeatherHumidity.innerText = `Humidity: ${Math.round(
      dayData.humidity
    )} %`
    tripCardInfoCardWeatherUVIndex.innerText = `UV Index: ${Math.round(
      dayData.uvIndex
    )}`
    tripCardInfoCardWeatherDew.innerText = `DewPt: ${Math.round(
      dayData.dewPoint
    )} ˚`
    tripCardInfoCardWeatherCloudCover.innerText = `Cloud Cover: ${(dayData.cloudCover ||
      0) * 100} %`
    tripCardInfoCardWeatherPressure.innerText = `Pressure: ${Math.round(
      dayData.pressure
    )} mb`
  }

  if (data.pixaBay && data.pixaBay.hits && data.pixaBay.hits.length > 0) {
    const pixaBayData = data.pixaBay.hits[0]
    tripCardImage.src = pixaBayData.webformatURL
    tripCardImage.alt = pixaBayData.tags
    tripCardImage.title = pixaBayData.tags
  }

  if (
    data.restCountries &&
    data.restCountries.flag &&
    data.restCountries.name &&
    data.restCountries.population &&
    data.restCountries.demonym
  ) {
    tripCardInfoCardCountryImage.src = data.restCountries.flag
    tripCardInfoCardCountryImage.alt = data.restCountries.name
    tripCardInfoCardCountryImage.title = data.restCountries.name

    tripCardInfoCardPopulation.innerText = `Population: ${utils.numberWithCommas(
      data.restCountries.population
    )}`
    tripCardInfoCardDemonym.innerText = `Demonym: ${data.restCountries.demonym}`

    if (data.pixaBay && data.pixaBay.hits && data.pixaBay.hits.length === 0) {
      tripCardImage.src = tripCardInfoCardCountryImage.src
      tripCardImage.alt = tripCardInfoCardCountryImage.alt
      tripCardImage.title = tripCardInfoCardCountryImage.title
    }
  }
}

export const deleteTrip = id => {
  if (typeof Storage !== 'undefined') {
    let trips = JSON.parse(localStorage.getItem('tripData') || '[]')
    trips = trips.filter(trip => trip.id !== id)
    localStorage.setItem('tripData', JSON.stringify(trips))
    document.getElementById(`tripCard${id}`).remove()
  } else {
    alert(
      'Sorry, trip cannot be deleted because your browser does not support Web Storage.'
    )
  }
}

export const loadTripCards = () => {
  if (typeof Storage !== 'undefined') {
    let trips = JSON.parse(localStorage.getItem('tripData') || '[]')
    addTripCards(trips)
  }
}

export const saveTrip = () => {
  let trip = {
    date: arrivalDateInput.value,
    tripCardImageSrc: tripCardImage.src,
    tripCardImageAlt: tripCardImage.alt,
    tripCardImageTitle: tripCardImage.title,
    tripCardInfoCardCountryInnerText: tripCardInfoCardCountry.innerText,
    tripCardTitleInnerText: tripCardTitle.innerHTML,
    tripCardSubTitleInnerText: tripCardSubTitle.innerText,
    tripCardTextInnerText: tripCardText.innerText,
    tripCardInfoCardWeatherImageSrc: tripCardInfoCardWeatherImage.src,
    tripCardInfoCardWeatherImageAlt: tripCardInfoCardWeatherImage.alt,
    tripCardInfoCardWeatherImageTitle: tripCardInfoCardWeatherImage.title,
    tripCardInfoCardWeatherTitleInnerText:
      tripCardInfoCardWeatherTitle.innerText,
    tripCardInfoCardWeatherFeelsLikeInnerText:
      tripCardInfoCardWeatherFeelsLike.innerText,
    tripCardInfoCardWeatherLowInnerText: tripCardInfoCardWeatherLow.innerText,
    tripCardInfoCardWeatherHighInnerText: tripCardInfoCardWeatherHigh.innerText,
    tripCardInfoCardWeatherWindInnerText: tripCardInfoCardWeatherWind.innerText,
    tripCardInfoCardWeatherHumidityInnerText:
      tripCardInfoCardWeatherHumidity.innerText,
    tripCardInfoCardWeatherUVIndexInnerText:
      tripCardInfoCardWeatherUVIndex.innerText,
    tripCardInfoCardWeatherDewInnerText: tripCardInfoCardWeatherDew.innerText,
    tripCardInfoCardWeatherCloudCoverInnerText:
      tripCardInfoCardWeatherCloudCover.innerText,
    tripCardInfoCardWeatherPressureInnerText:
      tripCardInfoCardWeatherPressure.innerText,
    tripCardInfoCardCountryImageSrc: tripCardInfoCardCountryImage.src,
    tripCardInfoCardCountryImageAlt: tripCardInfoCardCountryImage.alt,
    tripCardInfoCardCountryImageTitle: tripCardInfoCardCountryImage.title,
    tripCardInfoCardPopulationInnerText: tripCardInfoCardPopulation.innerText,
    tripCardInfoCardDemonymInnerText: tripCardInfoCardDemonym.innerText
  }

  if (typeof Storage !== 'undefined') {
    let trips = JSON.parse(localStorage.getItem('tripData') || '[]')
    trip = { id: trips.length + 1, ...trip }
    trips.push(trip)
    localStorage.setItem('tripData', JSON.stringify(trips))
    addTripCards([trip])
    utils.hideElement(modalForm)
    utils.hideElement(tripDetailsCard)
    utils.showElement(tripCaptureCard)
    utils.toggleLoader(false)
  } else {
    alert(
      'Sorry, trip cannot be saved because your browser does not support Web Storage.'
    )
  }
}

const addTripCards = trips => {
  if (trips && trips.length > 0) {
    const tripsGrid = document.querySelector('#tripsGrid')
    let cardContent = ''
    trips.sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1))
    for (const trip of trips) {
      console.log('trip', trip)
      cardContent += `
        <div id="tripCard${trip.id}" class="image-box">
            <div class="column">
                <div class="post-module hover">
                <div class="thumbnail">
                    <div class="date">
                    ${utils.getCardDateContent(trip.tripCardSubTitleInnerText)}
                    </div>
                    <img
                    src="${trip.tripCardImageSrc}"
                    alt="${trip.tripCardImageAlt}"
                    title="${trip.tripCardImageTitle}"
                    />
                </div>
                <div class="post-content">
                    <div class="category">Trips</div>
                    <h1 class="title">${trip.tripCardTitleInnerText}</h1>
                    <h2 class="sub_title">${trip.tripCardSubTitleInnerText}</h2>
                    <p class="description">
                    ${utils.getTripCountdownMessage(
                      trip.tripCardSubTitleInnerText
                    )}
                    </p>
                    <div class="post-meta">
                    <span class="navigation" onclick="viewTrip(${trip.id});"
                        >TRIP DETAILS</span
                    >
                    <span class="navigation" onclick="deleteTrip(${trip.id});"
                        >DELETE TRIP</span
                    >
                    </div>
                </div>
                </div>
            </div>
        </div>
  `
    }
    tripsGrid.insertAdjacentHTML('beforeend', cardContent)
  }
}

export const getTrip = id => {
  if (typeof Storage !== 'undefined') {
    const trips = JSON.parse(localStorage.getItem('tripData') || '[]')
    const trip = trips.find(trip => trip.id === id)
    if (trip !== undefined) {
      populateTrip(trip)
    } else {
      alert('Sorry, trip was not found.')
    }
  } else {
    alert(
      'Sorry, trip cannot be saved because your browser does not support Web Storage.'
    )
  }
}

const clearTrip = () => {
  tripDetailsCard.setAttribute('data-id', '0')
  tripCardImage.src = 'assets/images/blurred-background.jpg'
  tripCardImage.alt = 'Loading data...'
  tripCardImage.title = 'Loading data...'

  tripCardInfoCardCountry.innerText = ''
  tripCardTitle.innerHTML = ''
  tripCardSubTitle.innerText = ''
  tripCardText.innerText = ''
  tripCardInfoCardWeatherImage.src = ''
  tripCardInfoCardWeatherImage.alt = ''
  tripCardInfoCardWeatherImage.title = ''
  tripCardInfoCardWeatherTitle.innerText = ''
  tripCardInfoCardWeatherFeelsLike.innerText = ''
  tripCardInfoCardWeatherLow.innerText = ''
  tripCardInfoCardWeatherHigh.innerText = ''
  tripCardInfoCardWeatherWind.innerText = ''
  tripCardInfoCardWeatherHumidity.innerText = ''
  tripCardInfoCardWeatherUVIndex.innerText = ''
  tripCardInfoCardWeatherDew.innerText = ''
  tripCardInfoCardWeatherCloudCover.innerText = ''
  tripCardInfoCardWeatherPressure.innerText = ''
  tripCardInfoCardCountryImage.src = ''
  tripCardInfoCardCountryImage.alt = ''
  tripCardInfoCardCountryImage.title = ''
  tripCardInfoCardPopulation.innerText = ''
  tripCardInfoCardDemonym.innerText = ''
}

const populateTrip = trip => {
  clearTrip()

  tripDetailsCard.setAttribute('data-id', trip.id)
  tripCardImage.src = trip.tripCardImageSrc
  tripCardImage.alt = trip.tripCardImageAlt
  tripCardImage.title = trip.tripCardImageTitle
  tripCardInfoCardCountry.innerText = trip.tripCardInfoCardCountryInnerText
  tripCardTitle.innerHTML = trip.tripCardTitleInnerText
  tripCardSubTitle.innerText = trip.tripCardSubTitleInnerText
  tripCardText.innerText = trip.tripCardTextInnerText
  tripCardInfoCardWeatherImage.src = trip.tripCardInfoCardWeatherImageSrc
  tripCardInfoCardWeatherImage.alt = trip.tripCardInfoCardWeatherImageAlt
  tripCardInfoCardWeatherImage.title = trip.tripCardInfoCardWeatherImageTitle
  tripCardInfoCardWeatherTitle.innerText =
    trip.tripCardInfoCardWeatherTitleInnerText
  tripCardInfoCardWeatherFeelsLike.innerText =
    trip.tripCardInfoCardWeatherFeelsLikeInnerText
  tripCardInfoCardWeatherLow.innerText =
    trip.tripCardInfoCardWeatherLowInnerText
  tripCardInfoCardWeatherHigh.innerText =
    trip.tripCardInfoCardWeatherHighInnerText
  tripCardInfoCardWeatherWind.innerText =
    trip.tripCardInfoCardWeatherWindInnerText
  tripCardInfoCardWeatherHumidity.innerText =
    trip.tripCardInfoCardWeatherHumidityInnerText
  tripCardInfoCardWeatherUVIndex.innerText =
    trip.tripCardInfoCardWeatherUVIndexInnerText
  tripCardInfoCardWeatherDew.innerText =
    trip.tripCardInfoCardWeatherDewInnerText
  tripCardInfoCardWeatherCloudCover.innerText =
    trip.tripCardInfoCardWeatherCloudCoverInnerText
  tripCardInfoCardWeatherPressure.innerText =
    trip.tripCardInfoCardWeatherPressureInnerText
  tripCardInfoCardCountryImage.src = trip.tripCardInfoCardCountryImageSrc
  tripCardInfoCardCountryImage.alt = trip.tripCardInfoCardCountryImageAlt
  tripCardInfoCardCountryImage.title = trip.tripCardInfoCardCountryImageTitle
  tripCardInfoCardPopulation.innerText =
    trip.tripCardInfoCardPopulationInnerText
  tripCardInfoCardDemonym.innerText = trip.tripCardInfoCardDemonymInnerText
}
