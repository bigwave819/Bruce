const Product = require("../models/productsModel");

const createProduct = async (req, res) => {
    try {
        const { name, description, price, size, color, category, imageUrl } = req.body;

        if (!name || !description || !price || !size || !color || !category || !imageUrl) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newProduct = new Product({
            name,
            description,
            price,
            size,
            color,
            category,
            imageUrl
        });
        await newProduct.save();
        res.status(200).json({
            message: "New product is just saved successfully"
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Internal server Error: ", 
            error: error.message 
        })
    }
};

const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find();
        if (products.length === 0) {
            res.status(404).json({
                message: "No product found"
            })
        }
        res.status(200).json({
            products
        })
    } catch (error) {
        res.status(500).json({ 
            message: "Internal server Error: ", 
            error: error.message 
        });
    }
};

const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "No such product found"
            });
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ 
            message: "Internal server Error: ", 
            error: error.message 
        });
    };
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params

        const updatedData = req.body;

        const updated = await Product.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updated) {
            res.status(404).json({
                message: "No Product found"
            })
        };
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ 
            message: "Internal server error: ", 
            error: error.message
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Product.findByIdAndDelete(id);
        if (!deleted) {
            res.status(404).json({
                message: 'the product not found'
            });
        }
        res.status(200).json({
            message:"product deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server error",
            error: error.message
        });
    };
};

module.exports ={
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
}