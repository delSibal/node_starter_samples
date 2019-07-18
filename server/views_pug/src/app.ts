import bodyParser from 'body-parser'
import express from 'express'
import configuration from './configuration'
import path from 'path'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(configuration.port, () => console.log(`✅ Server is running on port ${configuration.port}`))
