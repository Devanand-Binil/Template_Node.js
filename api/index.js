// =======================================================
//                      Imports
// =======================================================
import serverless from 'serverless-http';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';


// =======================================================
//              Environment Configuration
// =======================================================
dotenv.config();
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const NODE_ENV = process.env.NODE_ENV ;
const ALLOW_ALL_ORIGINS = process.env.ALLOW_ALL_ORIGINS === 'true';
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(',').map(o => o.trim()) || [];


// =======================================================
//                  App Initialization
// =======================================================
const app = express();


// =======================================================
//                  Global Middleware
// =======================================================
app.use(express.json());
app.use(helmet());
app.use(
  helmet.crossOriginResourcePolicy({
    policy: ALLOW_ALL_ORIGINS ? 'cross-origin' : 'same-origin',
  })
);

app.use(
  cors({
    origin: (origin, callback) => {
      if (ALLOW_ALL_ORIGINS || !origin || ALLOWED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

// Environment-Based Middleware
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log('🛠️ Development Mode: Logging enabled via Morgan');
}

if (NODE_ENV === 'production') {
  console.log('🚀 Production Mode: Optimized for performance');
  app.set('trust proxy', 1); // For reverse proxies like Heroku, Nginx
}


// =======================================================
//                        Routes
// =======================================================

// ---------- Health Check ----------
app.get('/api/health', (req, res) => {
  res.status(200).json({
    Message: 'API is running smoothly.',
    Environment: NODE_ENV,
  });
});

import mainRouter from './routes/mainRouter.js';
app.use('/', mainRouter);


// =======================================================
//                  Error Handling
// =======================================================

// 404 Route Not Found
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    error: '🚷Route not found🚷',
    path: req.originalUrl,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      success: false,
      statusCode: 403,
      error: '✋Request blocked: Origin not allowed by CORS policy.',
    });
  }

  res.status(500).json({
    success: false,
    statusCode: 500,
    error: 'Internal Server Error',
    message: err.message,
    ...(NODE_ENV === 'development' && { stack: err.stack }),
  });
});


// =======================================================
//                Database Configuration
// =======================================================
//Refer db folder

// =======================================================
//                   Server Activation
// =======================================================


// =======================================================
//                      Export App
// =======================================================
export default serverless(app);
