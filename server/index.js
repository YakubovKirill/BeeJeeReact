const request = require('request')
const express = require('express')
const app = express()
const cors = require('cors')
const body_parser = require('body-parser')
const fetch = require("node-fetch");

app.use(cors({
    methods: ['GET', 'POST'],
    credentials: true
}))
app.use(body_parser.urlencoded({extended: true}))
app.use(express.json())
app.use(body_parser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    return res.send('')
})

app.listen(3001, () => {
    console.log('listening port 3001')
})