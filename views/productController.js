const Category = require('../models/Category')
const Product = require('../models/Product')

class productController {

    async productGet(req, res) {
        try {
            if (req.params.id){
                const id = req.params.id
                const product = await Product.findOne({category_id: id})
                res.json(product)
            }else{
                const product = await Product.find()
                return res.json(product)
            }

        } catch (e) {
            console.log(e)
            res.status(400).json({message:'product get error'})
        }
    }


    async productCreate(req, res) {
        try {
            const product = new Product(req.body)
            let id = product.category_id.join()
            await product.save()
            Category.findByIdAndUpdate(
                { _id: id },
                { $push: { 'products_count': product} },
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

    async productDelete(req, res) {
        try {
            const id = req.params.id
            const deleteIdProduct = await Product.findByIdAndDelete(id)
            res.json(deleteIdProduct)
        } catch (e) {
            console.log(e)
            res.status(400).json({message:'product id error'})
        }
    }
}

module.exports = new productController()