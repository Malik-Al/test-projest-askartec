const {Schema, model} = require('mongoose')

const Product = new Schema({
    name: {type: String, unique: true},
    category_id: [{type: Schema.Types.ObjectId, ref: 'Category'}]
})

module.exports = model('Product',Product)