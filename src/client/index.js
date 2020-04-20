import { searchTrip } from './js/searchTrip'
import * as tripUtils from './js/tripUtils'
import * as utils from './js/utils'
import './styles/index.scss'

const _initServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('sw.js')
        .then(registration => {
          console.log('SW registered: ', registration)
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError)
        })
    })
  }
}
_initServiceWorker()

document.addEventListener('DOMContentLoaded', () => {
  init()
})

const init = () => {
  const modalForm = document.getElementById('modalForm')
  const tripCaptureCard = document.getElementById('tripCaptureCard')
  const tripDetailsCard = document.getElementById('tripDetailsCard')
  const addTripButton = document.getElementById('addTripButton')
  const destinationInput = document.getElementById('destinationInput')
  const arrivalDateInput = document.getElementById('arrivalDateInput')
  const searchButton = document.getElementById('searchButton')

  tripUtils.loadTripCards()

  addTripButton.addEventListener('click', () => {
    utils.showElement(tripCaptureCard)
    utils.hideElement(tripDetailsCard)
    utils.showElement(modalForm)
  })

  saveTripButton.addEventListener('click', () => {
    utils.toggleLoader(true)
    tripUtils.saveTrip()
  })

  cancelTripButton.addEventListener('click', () => {
    const tripId = tripDetailsCard.getAttribute('data-id')
    utils.hideElement(modalForm)
    utils.hideElement(tripDetailsCard)
    utils.showElement(tripCaptureCard)

    if (tripId && Number(tripId) <= 0) {
      utils.showElement(modalForm)
    }
  })

  destinationInput.addEventListener('focus', () => {
    utils.clearElement(destinationInput.nextElementSibling)
  })

  destinationInput.addEventListener('blur', () => {
    utils.clearElement(destinationInput.nextElementSibling)
  })

  arrivalDateInput.addEventListener('focus', () => {
    utils.clearElement(arrivalDateInput.nextElementSibling)
  })

  arrivalDateInput.addEventListener('blur', () => {
    utils.clearElement(arrivalDateInput.nextElementSibling)
  })

  searchButton.addEventListener('click', () => {
    utils.toggleLoader(true)
    utils.hideElement(modalForm)
    utils.hideElement(tripCaptureCard)
    utils.showElement(saveTripButton)
    cancelTripButton.innerText = 'CANCEL'
    let isValid = true

    const destinationName = destinationInput.value
      ? destinationInput.value.trim()
      : null
    const date = arrivalDateInput.value ? arrivalDateInput.value.trim() : null

    if (date === null) {
      isValid = false
      arrivalDateInput.nextElementSibling.innerText =
        '* Arrival date is required.'
    }

    if (destinationName === null) {
      isValid = false
      destinationInput.nextElementSibling.innerText =
        '* Destination is required.'
    }

    if (isValid) {
      searchTrip(date, destinationName).then(response => {
        if (response.success) {
          tripUtils.displayTrip(response.data)
          utils.showElement(tripDetailsCard)
          utils.toggleLoader(false)
          utils.showElement(modalForm)
          utils.scrollElementTop(document.getElementById('modalForm'))
        } else {
          console.log('ERROR', response.message)
          utils.showElement(tripCaptureCard)
          utils.toggleLoader(false)
          alert('An unexpected error has occurred. Please try again later.')
          utils.showElement(modalForm)
        }
      })
    } else {
      utils.showElement(tripCaptureCard)
      utils.toggleLoader(false)
      utils.showElement(modalForm)
    }
  })

  window.addEventListener('click', () => {
    if (event.target == modalForm) {
      utils.hideElement(modalForm)
      utils.hideElement(tripCaptureCard)
      utils.hideElement(tripDetailsCard)
    }
  })
}

const viewTrip = id => {
  utils.toggleLoader(true)
  tripUtils.getTrip(id)
  utils.hideElement(saveTripButton)
  cancelTripButton.innerText = 'CLOSE'
  utils.hideElement(tripCaptureCard)
  utils.showElement(tripDetailsCard)
  utils.toggleLoader(false)
  utils.showElement(modalForm)
  utils.scrollElementTop(document.getElementById('modalForm'))
}

const deleteTrip = id => {
  tripUtils.deleteTrip(id)
}

window.deleteTrip = deleteTrip
window.viewTrip = viewTrip
