const path = require('path')
const fs = require('fs')
const http = require('http')

const host = 'localhost'
const port = 8000

const requestLestener = (req, res) => {
  if (req.url === '/get' && req.method === 'GET') {
    false.readdir(path.join(__dirname, 'files'), 'utf-8', (err, files) => {
      if (err) {
        res.writeHead(500)
        res.end('Internal server error')
        throw new Error(err)
      }

      res.writeHead(200)
      for (item of files) {
        res.write(item + ' ')
      }
      res.end()
    })
  } else if (req.url === '/delete' && req.method === 'DELETE') {
    res.writeHead(200)
    res.end('success delete')
  } else if (req.url === '/post' && req.method === 'POST') {
    res.writeHead(200)
    res.end('success post')
  } else if (req.url === '/redirect' && req.method === 'GET') {
    res.writeHead(301, { Location: '/redirected' })
    res.end('the resource is available at the link /redirected')
  } else if (req.url === '/redirected' && req.method === 'GET') {
    res.writeHead(200)
    res.end('succesfully redirected')
  } else {
    res.writeHead(405)
    res.end('HTTP method not allowed')
  }
}

const server = http.createServer(requestLestener)

server.listen(port, host, () => {
  console.log('Server is running on http://${host}:${port}')
})
