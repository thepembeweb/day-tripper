import { getData } from '../client/js/utils'

it('test spinner toggle function', async () => {
  const url = `http://localhost:5000/search?date='30/04/2020'&destination='London'`
  getData(url).then(response => {
    expect(response.status).toEqual(200)
  })
})
