const createError = require("http-errors");
const express = require('express');
const cors = require('cors')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const platformRouter = require('./routes/platform'); 
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");
require('dotenv').config()

const app = express();


const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI
// may need to change node version
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60,
});
// Apply rate limiter to all requests
app.use(cors({
  origin: "https://slug-panel.onrender.com",
  headers: ["Content-Type"],
  credentials: true,
}));

app.use(limiter);

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  }),
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use("/platform", platformRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
  });

  // error handler
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.send("error");
  });


module.exports = app;
