const app = require('./server')

describe('Testing the root path port', () => {
  test('It should get root path port', () => {
    const expectedPort = 5001
    let port = app.listen(expectedPort, function () {
      console.log(`Test app listening on port: ${expectedPort}`)
    })
    expect(port.address().port).toBe(expectedPort)
  })
})
