const http=require('http')
// importing module
const requestHandler=require("./user")
const server = http.createServer(requestHandler)

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
