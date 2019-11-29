logger = (req, res, next) => {
    console.log(`Logged ${req.url} ${req.method} --${new Date()}`)
    next()
};
erroRoute = (req, res, next) => {
    var error = new Error('Wrong route!');
    error.status = 404;
    next(error);
};
errHandler = (err, req, res, next) => {
    var errObj = {
        status: err.status,
        message: err.message
    }
    res.status(err.status || 500).send(errObj);
};
module.exports = {
    logger,
    erroRoute,
    errHandler
}