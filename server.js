const app = require('express')();
const setUp = require('./server/middleware/setup');
const dbSetup = require('./server/middleware/Database')
const endpointSetup = require('./server/controller')
require('dotenv').config();
//Setup middleware
setUp(app)
//setup DB
dbSetup(app)

endpointSetup(app)

const port = process.env.PORT || 8090;
app.listen(port, ()=>{
console.log(`Listening on port ${port}`)
})