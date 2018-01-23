const Koa = require('koa')
const compose = require('koa-compose')
const app = new Koa()


var otp = require('.')("jkjldsfsfsdf")

var _token;

// app.use( (ctx,next) => {
//     switch (ctx.path) {
//         case '/encode':
//             return otp.encode(function (ctx, next) {
//                 ctx.body = ctx.otp_token
//             })(ctx, next)
//             break
//         case '/decode':
//             return compose([otp.encode(function (ctx, next) {
//                 _token = ctx.otp_token
//                 return next()
//             }),
//             otp.decode(_token, function (ctx, next) {
//                 ctx.body = ctx.otp_valid
//             })
//             ])(ctx, next)

//             break
//     }
// })
app.use( (ctx,next) => {
    switch (ctx.path) {
        case '/encode':
            return otp.encode(function (ctx, next) {
                ctx.body = {
                    token: ctx.otp_token,
                    valid: ctx.otp_valid
                }
            })(ctx, next)
        case '/decode':
            return compose([otp.encode(function (ctx, next) {
                _token = ctx.otp_token
                return next()
            }),
            otp.decode(_token, function (ctx, next) {
                ctx.body = {
                    token: ctx.otp_token,
                    valid: ctx.otp_valid
                }
            })
            ])(ctx, next)
            break
    }
})

app.listen(3004)

