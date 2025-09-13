const http = require('http')
const server = http.createServer((req, res) => {
	console.log(req.url, req.method, req.headers)
	res.setHeader('Content-Type', 'text/html')
	res.write('<html>')
	res.write('<head><title>Node JS</title></head>');
	res.write('<body><h1>Learning Node JS</h1></body>')
	res.write('</html>')
	res.end();
})
const PORT = 3000
server.listen(PORT, () => {
	console.log(`server running at http://localhost:${PORT}`)
})
