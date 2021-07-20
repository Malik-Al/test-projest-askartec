const User = require('../models/User')

class userController {
    async userProductCreate(req, res) {
        try {
            const product = new User(req.body)
            const id = req.params.id
            User.findByIdAndUpdate(
                { _id: id },
                { $push: { 'products_count': product } },
                { safe: true },
                function (err, response) {
                    if (err) throw err;
                }
            )
            res.json(product)
        } catch (e) {
            console.log(e)
            res.status(400).json({message:'user product create error'})
        }
    }
    async userProductGet(req, res){
        try{
            const id = req.params.id
            const product = await User.findOne({_id: id})
            res.json(product)
        } catch (e) {
            console.log(e)
            res.status(400).json({message:'user get error'})
        }
    }

}
module.exports = new userController()