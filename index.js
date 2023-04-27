const express = require('express')

const bodyParser = require('body-parser')

const db = require('./queries')

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

const PORT = 4000;

app.get('/', (req,res)=> {
    res.json({
        info : 'Node.js Express & Postgres CRUD API test'
    })
})

app.get('/users',db.getUsers);
app.post('/users',db.createUser);
app.delete('/users/:id',db.deleteUser);
app.put('/users/:id',db.updateUser)   

app.listen(PORT,() => {
    console.log("App is running on port http://localhost:4000")

})