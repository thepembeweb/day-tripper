const supertest = require('supertest')
const app = require('./server')
const request = supertest(app)

describe('Testing the root path', () => {
  test('It should get root path', async () => {
    const response = await request.get('/')
    expect(response.statusCode).toBe(200)
  })
})
