import request from 'request'

const getDarkSkyData = async (date, latitude, longitude) => {
  const time = Math.floor(new Date(date).getTime() / 1000.0)
  const url = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${latitude},${longitude},${time}?exclude=currently,hourly,flags`

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
            data: { ...data }
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

export { getDarkSkyData }
