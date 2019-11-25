const express = require('express');

let accRoutes = require('./accounts/routes');
let brchRoutes = require('./branch/routes')
let cusRoutes = require('./customer/routes');
let emplRoutes = require('./employee/routes');
let loanRoutes = require('./loan/routes');

let appRouter = express.Router();

appRouter.use(accRoutes);
appRouter.use(brchRoutes);
appRouter.use(cusRoutes);
appRouter.use(emplRoutes);
appRouter.use(loanRoutes);

module.exports = appRouter
