function sendErr(err, res, env) {
    if (err.name == 'CastError') {
        err.message = `${err.value} is not a valide ${err.path}`;
        err.status = 400;
    }
    if (err.name == 'ValidationError') {
        let msg = [];
        for (er in err.errors) {
            msg.push(er);
        }
        err.message = `${msg.join('-')}: invalid data`;
        err.status = 400;
    }
    if (err.name == 'MongoError') {
        for (er in err.keyValue) {
            err.message = `the ${er} requires an unique entry and '${err.keyValue[er]}' has already used`;
        }
        err.status = 400;
    }

    if(err.name == 'JsonWebTokenError'){
        return res.status(200).redirect('/');
    }
    return res.status(err.status || 404).json({
        status: err.status,
        message: err.message,
        err: env ? err : undefined,
        name: env ? err.name : undefined,
        stack: env ? err.stack : undefined,
    });
}
module.exports = (err, req, res, next) => {
    if (process.env.NODE_ENV == 'development') {
        sendErr(err, res, true);
    } else {
        sendErr(err, res, false);
    }
}