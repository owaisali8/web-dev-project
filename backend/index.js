const express = require('express')
const app = express()
const cors = require('cors')
const fileUpload = require('express-fileupload');

const PORT = process.env.PORT || 3000

const { connectDB } = require('./src/config/db')

const homeRoute = require('./src/routes/home')
const adminRoute = require('./src/routes/admin')
const loginRoute = require('./src/routes/login')
const employerRoute = require('./src/routes/employer')
const employeeRoute = require('./src/routes/employee')
const jobsRoute = require('./src/routes/jobs') 

connectDB()

app.use(cors())
app.use(express.json())
app.use(fileUpload())

app.use('/', homeRoute);
app.use('/admin', adminRoute);
app.use('/login', loginRoute);
app.use('/employer', employerRoute); //provider
app.use('/employee', employeeRoute); //worker
app.use('/jobs', jobsRoute);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
})
