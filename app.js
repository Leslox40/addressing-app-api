const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const db = mongoose.connect('mongodb+srv://adminuser-2022:6oGV4yfk9UuA4qQ4@addressing-app.61cmp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
const port = process.env.PORT || 5000;

const Client = require('./models/clientModel');
const clientRouter = require('./routes/clientRouter')(Client);
const User = require('./models/userModel');
const userRouter = require('./routes/authRoutes')(User);
const secretKey = require('./config/config');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

app.use('/api', clientRouter);
app.use('/api', userRouter);

require('./config/passport')(app);

app.get('/', (req, res) => {
  res.send('Welcome to my API');
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}`);
  }
});

const upload = multer({ storage });

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
