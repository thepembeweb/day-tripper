export const hideElement = element => {
  element.style.display = 'none'
}

export const showElement = element => {
  element.style.display = 'block'
}

export const clearElement = element => {
  element.innerText = ''
}

export const scrollElementTop = element => {
  element.scrollTop = 0
}

export const titleCase = value => {
  return value.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase())
}

export const formatDate = date => {
  const day = date.substr(8, 2)
  const month = date.substr(5, 2)
  const year = date.substr(0, 4)
  const months = getMonths()

  return `${Number(day)} ${months[Number(month) - 1]} ${year}`
}

export const getNumberOfDaysUntil = date => {
  const currentDate = new Date()
  const untilDate = new Date(date)
  let dayCount = 0

  while (untilDate >= currentDate) {
    dayCount++
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dayCount
}

export const getApparentTemperature = (minTemperature, maxTemperature) => {
  return Math.round((minTemperature + maxTemperature) / 2)
}

export const numberWithCommas = value => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const getCardDateContent = text => {
  const fullDate = text.replace('Departing on', '').trim()
  const dateFragments = fullDate.split(' ')

  if (dateFragments.length === 3) {
    const day = dateFragments[0]
    const month = dateFragments[1]

    return `
        <div class="day">${day}</div>
        <div class="month">${month}</div>  
      `
  } else {
    return ''
  }
}

export const getTripCountdownMessage = text => {
  const fullDate = text.replace('Departing on', '').trim()
  const dateFragments = fullDate.split(' ')

  if (dateFragments.length === 3) {
    const day = dateFragments[0]
    const month = dateFragments[1]
    const year = dateFragments[2]
    const months = getMonths()
    const tripDate = new Date(`${year}-${months.indexOf(month) + 1}-${day}`)

    return `Hi there! Your trip is ${getNumberOfDaysUntil(
      tripDate
    )} days away 😀`
  } else {
    return ''
  }
}

export const getData = async path => {
  return await fetch(path, {
    method: 'GET',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow'
  })
}

export const toggleLoader = flag => {
  const spinnerElement = document.getElementById('loader')
  if (flag) {
    spinnerElement.classList.add('loader__visible')
  } else {
    spinnerElement.classList.remove('loader__visible')
  }
}

const getMonths = () => {
  return [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
}
