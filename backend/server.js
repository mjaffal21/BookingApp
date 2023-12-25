const express = require('express');
const dotenv = require('dotenv').config({ path: './.env' });
const connectDB = require('./db');
const errorHandler = require('./middlewares/errorHandler');
const asyncHandler = require('./middlewares/asyncHandler');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');

const port = process.env.PORT;
connectDB();

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const usersRoute = require('./routes/users');
const placesRoute = require('./routes/places');
const uploadsRoute = require('./routes/uploadRoute');
const booksRoute = require('./routes/books');

app.use('/api/user', usersRoute);
app.use('/api/upload', uploadsRoute);
app.use('/api/place', placesRoute);
app.use('/api/booking', booksRoute);

const __dir = path.resolve();
app.use('/uploads', express.static(path.join(__dir, '/uploads')));

app.use(asyncHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Backend Running on port ${port} ...`);
});
