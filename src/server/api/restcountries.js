import request from 'request'

const getRestCountriesData = async code => {
  const url = `https://restcountries.eu/rest/v2/alpha/${code}`

  return new Promise((resolve, reject) => {
    request(url, { json: true }, (err, res, data) => {
      if (err) {
        reject(
          new Error({
            success: false,
            message: 'An unexpected error has occurred. Please try again later.'
          })
        )
      } else {
        if (data) {
          resolve({
            success: true,
            data: data
          })
        } else {
          resolve({
            success: false,
            message: 'An unexpected error has occurred. Please try again later.'
          })
        }
      }
    })
  })
}

export { getRestCountriesData }
