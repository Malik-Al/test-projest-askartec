const Router = require('express')
const router = new Router()
const authentification = require('./auth/authentification')
const productController = require('./views/productController')
const categoryController = require('./views/categoryController')
const userController = require('./views/userController')
const {check} = require('express-validator')

router.post('/register',[
    check('username','Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль должен быть добше 4 или менье 10 символов').isLength({min:4,max:10})
], authentification.registration)
router.post('/login', authentification.login)
router.post('/users/product/create/:id', userController.userProductCreate)
router.get('/users/product/:id', userController.userProductGet)

router.get('/category', categoryController.categoryGet)
router.get('/category/:id', categoryController.categoryId)

router.get('/product/:id', productController.productGet)
router.get('/product', productController.productGet)

router.post('/product/create', productController.productCreate)
router.delete('/product/:id', productController.productDelete)
module.exports = router
