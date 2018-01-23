var notp = require('notp');

var opt = {
    window: 0,
};

var app = {
    encode: function (key) {
        // make sure we can not pass in opt
        return notp.totp.gen(key, opt);
    },
    decode: function (key, token) {
        var login = notp.totp.verify(token, key, opt);
        // invalid token if login is null
        if (!login) {
            console.log('Token invalid');
            return false;
        }

        // valid token
        // console.log('Token valid, sync value is %s', login.delta);
        return true;
    }
}

module.exports = function (key) {
    return {
        encode: function (cb) {
            return function (ctx, next) {
                var token = app.encode(key)
                ctx.otp_token = token
                if (cb) {
                    cb(ctx, next)
                } else {
                    return next()
                }
            }
        },
        decode: function (token, cb) {
            return function (ctx, next) {
                ctx.otp_valid = app.decode(key, token)
                if (cb) {
                    cb(ctx, next)
                } else {
                    return next()
                }
            }
        }
    }
}
