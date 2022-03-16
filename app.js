const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const db = mongoose.connect('mongodb://localhost/clientDB');
const port = process.env.PORT || 5000;

const Client = require('./models/clientModel');
const clientRouter = require('./routes/clientRouter')(Client);
const User = require('./models/userModel');
const userRouter = require('./routes/authRoutes')(User);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: 'storage' }));

app.use('/api', clientRouter);
app.use('/api', userRouter);

require('./config/passport')(app);

app.get('/', (req, res) => {
  res.send('Welcome to my API');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
