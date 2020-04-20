import { getData } from './utils'

const baseURL = 'http://localhost:5000'

const searchTrip = async (date, destination) => {
  return new Promise((resolve, reject) => {
    const url = `${baseURL}/search?date=${date}&destination=${destination}`
    getData(url)
      .then(response => {
        if (response.status !== 200) {
          reject(
            new Error({
              success: false,
              message:
                'An unexpected error has occurred. Please try again later.'
            })
          )
        }

        response.json().then(resData => {
          if (resData.success) {
            resolve({
              success: true,
              data: resData.data
            })
          } else {
            resolve({
              success: false,
              data: resData.data
            })
          }
        })
      })
      .catch(error => {
        reject(
          new Error({
            success: false,
            message: error
          })
        )
      })
  })
}

export { searchTrip }
