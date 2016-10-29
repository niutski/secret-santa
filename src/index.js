import express from 'express'

const app = express()

app.get('/foo', (req, res) => {
  res.json({foo: 'bar'})
})

const server = app.listen(3000, () => {
  const { host, port } = server.address()
  console.log('Server listening at http://%s:%s', host, port)
})
