# koa-otp

## Install

```
$ npm i -S koa-otp
```

## Usages

```
const Koa = require('koa')
const compose = require('koa-compose')
const app = new Koa()


var otp = require('koa-opt')("jkjldsfsfsdf")

var _token;

app.use((ctx, next) => {
    switch (ctx.path) {
        case '/encode':
            return otp.encode(function (ctx, next) {
                ctx.body = {
                    token: ctx.otp_token,
                    valid: ctx.otp_valid
                }
            })(ctx, next)
        case '/verify':
            return compose([otp.encode(function (ctx, next) {
                _token = ctx.otp_token
                return next()
            }),
            otp.verify(_token, function (ctx, next) {
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

```