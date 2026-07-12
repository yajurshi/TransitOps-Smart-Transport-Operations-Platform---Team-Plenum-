const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// Import middlewares
const errorHandler = require('./middleware/error.middleware');
const notFoundHandler = require('./middleware/notFound.middleware');
const apiRoutes = require('./routes/index');

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors({
    origin: true,
    credentials: true
}));

// Request Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Logging
app.use(morgan('dev'));

// Basic Healthcheck Route
app.get('/api/health', (req, res) => {
    res.json({ success: true, message: 'TransitOps API is running', data: {} });
});

// API Routes
app.use('/api', apiRoutes);

// Global Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
