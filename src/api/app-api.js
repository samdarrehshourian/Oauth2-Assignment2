/** API created with express */
const express = require('express') 
const app = express()
const morgan = require('morgan')
const cors= require('cors');

const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('./public'))
app.use(morgan('short'))

const router = require('./routes/users.js')

app.use(router)

// localhost:8000  
app.listen(8000, () => {
    console.log("Server is up and listeing on 8000...")
})