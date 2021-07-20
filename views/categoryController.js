const Category = require('../models/Category')


class categoryController {

    async categoryId(req, res) {
        try {
            const id = req.params.id
            const category = await Category.findOne({_id: id})
            res.json(category)
        } catch (e) {
            console.log(e)
            res.status(400).json({message:'category get error'})
        }
    }

    async categoryGet(req, res) {
        try {
            const category = await Category.find()
            res.json(category)
        } catch (e) {
            console.log(e)
            res.status(400).json({message:'category get error'})
        }
    }

}

module.exports = new categoryController()