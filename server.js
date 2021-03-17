const express = require('express')
const connectDB = require('./config/db')

const app = express();

// Connect to Database
connectDB();


app.get('/', (req, res) => {
    res.send('API RUNNING')
})

app.use('/api/users', require('./routes/API/users'))
app.use('/api/auth', require('./routes/API/auth'))
app.use('/api/profile', require('./routes/API/profile'))
app.use('/api/posts', require('./routes/API/posts'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})