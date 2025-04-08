const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    size: {
        type: ['M', 'L', 'XL', '2xl'],
        default: [],
        required: true
    },
    color: {
        type: ['white', 'black', 'red'],
        default:[],
        required: true
    },
    category: {
        type: ['t-shirt', 'jumper', 'sweater', 'pant', 'short'],
        default: [],
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });


const Product = mongoose.model('Product', productSchema);

module.exports = Product