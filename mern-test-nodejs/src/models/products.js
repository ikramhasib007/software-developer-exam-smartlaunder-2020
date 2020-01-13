const mongoose = require('mongoose');
const User = require('./user')


const productSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    startingPrice: {
        type: Number
    },
    thumbnail: {
        type: Buffer
    },
    bidingPrice: {
        type: Number,
        default: 0
    },
    lastBid: {
        type: String,
        default: ''
    },
    active: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number
    },
    finishTime: {
        type: Date
    }
})

productSchema.methods.toJSON = function () {
    const product = this
    const productObject = product.toObject()
    if (productObject.thumbnail) {
        productObject.image = '/fundrisers/image/' + product.id;
    }
    delete productObject.thumbnail;
    return productObject
}
productSchema.pre('save', async function (next) {
    const user = this;
    next()
})

const product = mongoose.model('products', productSchema)

module.exports = product;