emailValidator = (req, res, next) => {
    let email = req.body.email
    var validEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!validEmail.test(email)) {
        var error = new Error("Email is not valid!");
        error.status = 400;
        next(error);
    }
    next();
};
passwordValidator = (req, res, next) => {
    let password = req.body.password
    var validPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
    if(!validPassword.test(password)){
        var error = new Error("Password must contain at least one number, one uppercase and lowercase letter, and at least 8 or more characters");
        error.status = 400;
        next(error);
    }
    next();
};
module.exports = {
    emailValidator,
    passwordValidator
}