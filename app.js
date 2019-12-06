const express = require('express');
const bodyParser = require('body-parser');
const appRouter = require('./appRouter');
const middleware = require('./middleware/common');
var jwt = require('express-jwt');
var unless = require('express-unless')
require('dotenv/config');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(jwt({ secret:'customer'}).unless({path: ['/mk-bank/login']}));
app.use(middleware.logger);
app.use('/mk-bank',appRouter);
app.use(middleware.erroRoute);
app.use(middleware.errHandler);
var port = process.env.PORT || 3060
app.listen(port, () => {
  console.log(`Service up and listenig on port ${port}!`)
});