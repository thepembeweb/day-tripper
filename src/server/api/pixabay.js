import request from 'request'

const getPixaBayData = async dest => {
  const url = `https://pixabay.com/api?key=${process.env.PIXABAY_API_KEY}&q=${dest}&image_type=photo&category=places&per_page=3&pretty=true`

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

export { getPixaBayData }
