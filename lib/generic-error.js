module.exports = GenericError;

function GenericError(code, name, messageOrError) {
    var error = new Error(messageOrError);
    error.code = code;
    error.name = name;
    error.status = code;
    return error;
}