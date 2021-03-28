const express = require('express')
const app= express()

//setting
app.set('port',process.env.PORT || 3000)

//Middleware
app.use(express.json())

//Routes
app.use(require('./routes/subscribers'))


//starting server
app.listen(app.get('port'),()=>{
    console.log('server o port', app.get('port'))
})