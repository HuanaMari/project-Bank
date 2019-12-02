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


// validateDevice = (req, res, next) => {
//     let deviceName = req.body.Name;

//     if (deviceName.length > 20) {
//         var error = new Error("Device name length must be less than 20 chars!");
//         error.status = 400;
//         next(error);
//     }

//     newDeviceName = deviceName.replace(/\s+/g, '-');
//     const lettersAndDashes = /^[A-Za-z-]+$/;

//     if (!newDeviceName.match(lettersAndDashes)) {
//         var error = new Error("Device name must contains only letters and dashes!");
//         error.status = 400;
//         next(error);
//     }
    
//     req.body.Name = newDeviceName;
//     next();
// }