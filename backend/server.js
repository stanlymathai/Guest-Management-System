const express = require('express');
const app = express();

const con = require('./config/db.js');
const passport = require('./modules/backoffice/common/passport.js');

// connection test
con
  .authenticate()
  .then(() => console.log('db connected'))
  .catch((err) => console.log(err));

// connecting route to database
app.use(function (req, res, next) {
  req.con = con;
  next();
});

//initialize passport
app.use(passport.initialize());

// parsing body request
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// include router
const authRouter = require('./modules/backoffice/auth/routes/authRouter');
const userRouter = require('./modules/backoffice/user/routes/userRouter');
const queueRouter = require('./modules/backoffice/queue/routes/queueRouter');
const locationRouter = require('./modules/backoffice/location/routes/locationRouter');
const visitRouter = require('./modules/backoffice/visitManagement/routes/visitRoutes');

// routing
app.use(process.env.ENDPOINT_API + '/', authRouter);
app.use(process.env.ENDPOINT_API + '/user', userRouter);
app.use(process.env.ENDPOINT_API + '/visit', visitRouter);
app.use(process.env.ENDPOINT_API + '/queue', queueRouter);
app.use(process.env.ENDPOINT_API + '/location', locationRouter);

// starting server
app.listen(3000, function () {
  console.log('server listening on port 3000');
});
