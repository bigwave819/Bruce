const express = require("express");
const {
    createProduct,
    getAllProduct,
    getSingleProduct,
    deleteProduct,
    updateProduct
} = require("../controllers/productController");
const upload = require("../middleware/imageUploadMiddleware")


const router = express.Router();


router.post('/add', createProduct);
router.get("/", getAllProduct);
router.get('/:id', getSingleProduct);
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct);

router.post('/upload-image', upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ 
            success: false,
            message: "No file uploaded" 
        });
    }
    
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    
    return res.status(200).json({ 
        success: true,
        imageUrl 
    });
});

module.exports = router;