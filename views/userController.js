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
            res.status(400).json({message:'product create error'})
        }
    }
}
module.exports = new userController()