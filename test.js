var notp = require('notp');

var opt = {
    window : 0,
};

var app = {
  encode: function(key) {
    // make sure we can not pass in opt
    return notp.totp.gen(key, opt);
  },
  decode: function(key, token) {
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

// module.exports = function() {
//     function (ctx, next) {
    
//     };
// }

var a = app.encode("dddd")

console.log(a)


var flag = app.decode("dddd", a)

console.log(flag)


module.exports = function(key) {
    return {
        encode: function(){
            return function(ctx) {
                return app.encode(key)
            }
        },
        decode: function(token) {
            return function(ctx) {
                return app.decode(key, token)
            }
        }
    }
}
