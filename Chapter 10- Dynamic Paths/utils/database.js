const sql=require('mysql2');
const pool=sql.createPool({
	host:'localhost',
	user:'host',
	password:'Wasiq00001',
	database:'airbnb'
})

module.exports=pool.promise()