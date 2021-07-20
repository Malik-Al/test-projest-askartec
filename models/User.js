const {Schema, model} = require('mongoose')

const User = new Schema({
    username: {type: String, unique: true, required: true, default: 'User'},
    password: {type: String, required: true},
    products_count: [{type: Schema.Types.ObjectId, ref: 'Product'}]

})

module.exports = model('User',User)