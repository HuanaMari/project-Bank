emailValidator = (req,res,next) => {
    let email = req.body.email
    var validEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!validEmail.test(email)) {
        var error = new Error("Email is not valid!");
                error.status = 400;
                next(error);
    }
    next();
};

module.exports = {
    emailValidator
}