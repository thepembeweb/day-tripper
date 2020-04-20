import request from 'request'

const getGeoNamesData = async dest => {
  const url = `http://api.geonames.org/searchJSON?q=${dest}&maxRows=1&username=${process.env.GEONAMES_USERNAME}`

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
        if (data && data.geonames && data.geonames[0]) {
          const { countryCode, countryName, lat, lng } = data.geonames[0]
          resolve({
            success: true,
            data: { destination: dest, countryCode, countryName, lat, lng }
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

export { getGeoNamesData }
