const express = require('express');

let accRoutes = require('./accounts/routes');

let appRouter = express.Router();

appRouter.use(accRoutes);

module.exports = appRouter
