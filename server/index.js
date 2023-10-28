const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const UserModel = require('./models/UserModel')
const path = require('path')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

dotenv.config()
const PORT = process.env.PORT || 5000

mongoose.connect('mongodb+srv://metalvampire77:SVC2rYnPkv5CQSRa@cluster0.qhrablv.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log(`connected to database`)
})

.catch(err => console.log(err))

const db = mongoose.connection

// db.once('open', () => {
//     const databaseName = db.client.db.databaseName;
//     console.log('Database name:', databaseName);
// });


app.get('/Todos',(req,res) => {
    res.json(`Todos page`)
})

// Serve the React application
app.use(express.static(path.join(__dirname, '../client/dist')));


// For any other route, serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});



app.listen(PORT,() => {
    console.log(`server is running on port 5000`)
})

app.post('/',(req,res) => {
    res.json(`home page`)
})

app.post('/login',(req,res) => {
    const {email,password} = req.body
    UserModel.findOne({email})
    .then((user) => {
        if(user){
            if(user.password === password){
                const token = jwt.sign()
                res.json({ message: 'Logged in', email: user.email })
            } 
            else res.json(`wrong password`)
        }
        else res.json(`user not found`)
    })
})

app.post('/register',(req,res) => {
    const {email} = req.body
    UserModel.findOne({email})
    .then((user) => {
        if(user) res.json(`user already present`)
        else{
            UserModel.create(req.body)
            .then(user => res.json(user))
        }
    })
    .catch(err => res.json(err))
})