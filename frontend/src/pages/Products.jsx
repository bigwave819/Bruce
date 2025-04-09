import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BASEURL, API_PATHS } from "../utils/apiPaths";
import AddProductForm from "../components/product/AddProductForm";
import Modal from "../components/Modal";
import { LuPlus } from "react-icons/lu";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [expandedDescIds, setExpandedDescIds] = useState([]); // Track which products are expanded
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${BASEURL}${API_PATHS.PRODUCT_API.GET_ALL_PRODUCT}`
      );
      const data = response.data.products || [];
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(
          `${BASEURL}${API_PATHS.PRODUCT_API.DELETE_PRODUCT(productId)}`
        );
        toast.success("Product deleted successfully.");
        setProducts(products.filter((product) => product._id !== productId));
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete the product.");
      }
    }
  };

  const handleAddProduct = async (newProduct) => {
    const { name, description, price, size, color, category, imageUrl } = newProduct;

    if (!name || !description || !price || !size || !color || !category || !imageUrl) {
      toast.error("All fields are required.");
      return;
    }

    try {
      await axios.post(`${BASEURL}${API_PATHS.PRODUCT_API.ADD_PRODUCT}`, {
        name,
        description,
        price,
        size,
        color,
        category,
        imageUrl
      });

      setOpenAddProductModal(false);
      toast.success("Product added successfully.");
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product.");
    }
  };

  const toggleDescription = (id) => {
    setExpandedDescIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (!products.length) {
    return <p className="text-center text-red-500">No product found</p>;
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white px-4 py-12">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-bold text-3xl">Products</h1>
          <button
            className="flex items-center gap-1 bg-purple-700 text-white px-4 py-2 rounded-md"
            onClick={() => setOpenAddProductModal(true)}
          >
            <LuPlus className="text-lg" />
            Add Product
          </button>
        </div>

        <Modal
          isOpen={openAddProductModal}
          onClose={() => setOpenAddProductModal(false)}
          title="Add Product"
        >
          <AddProductForm onAddProduct={handleAddProduct} />
        </Modal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => {
            const isExpanded = expandedDescIds.includes(product._id);
            const shortDescription = product.description.slice(0, 120);

            return (
              <div key={product._id} className="bg-gray-800 rounded-lg p-6">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="w-full md:w-1/3 flex justify-center mb-4 md:mb-0">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-32 h-32 rounded-full object-cover shadow-lg"
                    />
                  </div>
                  <div className="w-full md:w-2/3 space-y-2 text-center md:text-left break-words">
                    <h2 className="font-bold text-2xl">{product.name}</h2>
                    <p className="text-gray-400">
                      {isExpanded ? product.description : `${shortDescription}...`}
                      {product.description.length > 120 && (
                        <button
                          className="text-blue-400 ml-1 underline"
                          onClick={() => toggleDescription(product._id)}
                        >
                          {isExpanded ? "Show Less" : "Show More"}
                        </button>
                      )}
                    </p>
                    <p className="text-lg font-semibold text-green-400">
                      FRW: {product.price}
                    </p>
                    <div className="mt-2">
                      <h3 className="font-semibold">Sizes:</h3>
                      <div className="flex flex-wrap gap-2">
                        {product.size?.map((size, index) => (
                          <span
                            key={index}
                            className="bg-gray-700 text-white px-3 py-1 rounded-full"
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-2">
                      <h3 className="font-semibold">Colors:</h3>
                      <div className="flex flex-wrap gap-2">
                        {product.color?.map((color, index) => (
                          <span
                            key={index}
                            className={`px-3 py-1 rounded-full ${
                              color === "white"
                                ? "bg-white text-gray-800"
                                : "bg-black text-white"
                            }`}
                          >
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-2">
                      <h3 className="font-semibold">Category:</h3>
                      <p className="text-gray-300">
                        {product.category?.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    className="bg-blue-500 text-white py-1 px-4 rounded-full hover:bg-blue-600"
                    onClick={() => navigate(`/edit-product/${product._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-4 rounded-full hover:bg-red-600"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
