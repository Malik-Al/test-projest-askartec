const Router = require('express')
const router = new Router()
const authentification = require('./auth/authentification')
const {check} = require('express-validator')

router.post('/register',[
    check('username','Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль должен быть добше 4 или менье 10 символов').isLength({min:4,max:10})
], authentification.registration)
router.post('/login', authentification.login)

module.exports = router