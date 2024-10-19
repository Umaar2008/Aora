const express = require('express');
const connectDB = require('./config/dbconnection')
const IsUserLoggedIn = require('./Middlewares/IsUserLoggedIn');
const app = express();
const cors = require('cors');
require('dotenv').config();

connectDB();
app.use(cors({
  origin: 'exp://192.168.0.111:8081',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(5000, '192.168.0.111', () => {
    console.log('Server is running on http://192.168.0.111:5000');
});


app.get('/test', (req, res) => {
  res.send('You are logged in!');
});

app.use("/User" , require('./Routes/UserRoutes'))
// app.use("/employee" , require('./Routes/EmployeRoutes'))
// app.use("/" , require('./Routes/ProductRoutes'))

