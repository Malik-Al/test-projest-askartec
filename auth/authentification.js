const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const {secret} = require('./jwt-secret')

const generateAccessToken = (id) => {
    const payload = { id }
    return jwt.sign(payload, secret, {expiresIn: "10m"})
}


class authentificationController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message:'Ошибка при регистраций',errors})
            }
            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if (candidate){
                return res.status(400).json({message: 'Пользователь есть с таким именем'})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({username,password: hashPassword})
            await user.save()
            return res.json({message: 'Пользователь успешно зарегистрировался'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message:'Registration error'})
        }

    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if(!user){
                return res.status(400).json({message:`Пользователь ${username} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword){
                return res.status(400).json({message:'Введен неверный пароль'})
            }
            const token = generateAccessToken(user._id)
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message:'login error'})
        }
    }

}

module.exports = new authentificationController()