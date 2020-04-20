import request from 'supertest'
import app from '../server/index'

describe('POST /search', () => {
  test('responds with json', async done => {
    request(app)
      .get('/search')
      .query({
        date: '30/04/2020',
        destination: 'London'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})
