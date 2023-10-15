const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')
const app = express()
const port = process.env.PORT || 5000;

app.use(express.json())

connectToMongo();
app.use(cors())

// Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/chats', require('./routes/chat'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
