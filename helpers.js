emailValidator = (email) => {

    var validEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!validEmail.test(email)) {
        return false
    }
    else {
        return true
    }
};

module.exports = {
    emailValidator
}
