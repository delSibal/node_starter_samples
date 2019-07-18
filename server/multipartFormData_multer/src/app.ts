import bodyParser from 'body-parser'
import express from 'express'
import configuration from './configuration'
import router from './multipartFormDataRoute'
import path from 'path'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// You might want to remove ejs module
app.set('views', path.join(__dirname, './views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.get('/', (req, res) => {
    res.render('test')
})

app.use('/multi-form', router)

app.listen(configuration.port, () => console.log(`✅ Server is running on port ${configuration.port}`))
