const {Schema, model} = require('mongoose')

const Category = new Schema({
    name: {type: String, unique: true},
    products_count: [{type: Schema.Types.ObjectId, ref: 'Product'}]

})


module.exports = model('Category', Category)