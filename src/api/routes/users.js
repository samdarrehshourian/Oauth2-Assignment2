/**API which is connected to MySQL database */
const express = require('express')
const mysql = require('mysql')
const router = express.Router()
const bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: false}))

//GET request to database
router.get('/:email', (req, res) =>{

    const connection = getConnection()
    const queryString = "SELECT (`history`) FROM logIn.tbl_logIn WHERE `e-mail`= (?);" 

    var email = req.params.email;
    
    connection.query(queryString,[email], (err, rows, fields) => {
        if(err){
            console.log("\n Failed to query: \n" + err + "\n")
            res.sendStatus(500)
            return
        }
        console.log("I think we fetched the user information successfully")
        res.json(rows)
    }) 
})

//POST request to database
router.post('/', (req, res) => {
    
    const connection = getConnection()

    var history = req.body.time_stamp; 
    var name = req.body.user_name;
    var email = req.body.user_email; 

    const queryString = "INSERT INTO logIn.tbl_logIn (`history`, `name`, `e-mail`) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE `history`= (?);"
 
    connection.query(queryString, [history, name, email, history], (error, result) => {
        if (error) throw error;
        res.status(201).send(`User added with id: ${result.insertId}`);
    });
})

//Pool connected to database 
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root', 
    password: 'password',
    database: 'logIn' 
})

//Function that returns pool
function getConnection() {
    return pool
}

module.exports = router