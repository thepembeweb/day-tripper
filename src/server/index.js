require('@babel/register')({
  presets: ['@babel/preset-env']
})

const app = require('./server.js')

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`)
})

module.exports = app
