const http=require('http')
const server=http.createServer((req,res)=>{
	console.log(req)
	process.exit()// stops the event loop/server
})
const PORT=3000
server.listen(PORT,()=>{
console.log(`server running at http://localhost:${PORT}`)
})