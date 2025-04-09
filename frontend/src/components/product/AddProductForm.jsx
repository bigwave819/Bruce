import React, { useState } from 'react';
import Input from "../Input/Input";
import axios from 'axios';
import { BASEURL, API_PATHS } from "../../utils/apiPaths"; // Adjust API paths if necessary

const AddProductForm = ({ onAddProduct }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    size: "",
    color: "",
    category: ""
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => setProduct({ ...product, [key]: value });

  // Function to upload image and return its URL
  const handleImageUpload = async () => {
    if (!imageFile) return ""; // If no image, return empty

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      // Adjust this endpoint if you create a separate UPLOAD_IMAGE endpoint
      const response = await axios.post(
        `${BASEURL}${API_PATHS.PRODUCT_API.UPLOAD_IMAGE}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setLoading(false);
      return response.data.imageUrl; // Assuming the server responds with the image URL
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
      return "";
    }
  };

  // On form submit, upload image and process form data
  const handleSubmit = async () => {
    if (!imageFile) {
      alert("Please upload an image file.");
      return;
    }

    // Process comma-separated values into arrays and convert price into a number
    const processedProduct = {
      ...product,
      price: Number(product.price),
      size: product.size.split(',').map(s => s.trim()),
      color: product.color.split(',').map(s => s.trim()),
      category: product.category.split(',').map(s => s.trim())
    };

    // Upload the image and get the URL
    const imageUrl = await handleImageUpload();

    if (!imageUrl) {
      alert("Image upload failed.");
      return;
    }

    // Pass all the product data to the parent component, including the imageUrl
    onAddProduct({ ...processedProduct, imageUrl });
  };

  return (
    <div>
      <Input
        value={product.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label="Name"
        placeholder="Product Name"
        type="text"
      />
      <Input
        value={product.description}
        onChange={({ target }) => handleChange("description", target.value)}
        label="Description"
        placeholder="Product Description"
        type="text"
      />
      <Input
        value={product.price}
        onChange={({ target }) => handleChange("price", target.value)}
        label="Price"
        placeholder="Product Price"
        type="number"
      />
      <Input
        value={product.size}
        onChange={({ target }) => handleChange("size", target.value)}
        label="Sizes"
        placeholder="Enter sizes separated by commas (e.g., M, L, XL, 2xl)"
        type="text"
      />
      <Input
        value={product.color}
        onChange={({ target }) => handleChange("color", target.value)}
        label="Colors"
        placeholder="Enter colors separated by commas (e.g., white, black, red)"
        type="text"
      />
      <Input
        value={product.category}
        onChange={({ target }) => handleChange("category", target.value)}
        label="Categories"
        placeholder="Enter categories separated by commas (e.g., t-shirt, jumper)"
        type="text"
      />
      <div className="mt-4">
        <label className="block mb-1 text-sm font-medium">Upload Product Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="text-white bg-amber-300"
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Add Product"}
        </button>
      </div>
    </div>
  );
};

export default AddProductForm;
