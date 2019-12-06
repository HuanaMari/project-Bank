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

// checkToken = (req, res, next) => {
//     const header = req.headers['authorization'];
//     if(typeof header !== 'undefined') {
//         const bearer = header.split(' ');
//         const token = bearer[1];
//         req.token = token;
//         next();
//     } else {
//         res.sendStatus(403)
//     }
// };

// verifyToken = (req, res,next) => {
//     jwt.verify(req.token, 'customer', (err, authorizedData) => {
//         if(err){
//             res.status(402).send('invalid token');
//         } else {
//             next()
//         }
//     });
// };


module.exports = {
    emailValidator,
    // checkToken,
    // verifyToken
}