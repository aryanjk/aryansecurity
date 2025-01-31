import React, { useEffect, useState } from "react";
import { getAllCategory, getAllProducts } from "../../apis/Api";
import CategoryCard from "../../components/caterogy/CategoryCard";
import ProductCards from "../../components/product/ProductCards";
import "./Style.css";

const Homepage = () => {
  const [products, setProducts] = useState([]); // Array
  const [categories, setCategories] = useState([]); // Array
  const [selectedCategory, setSelectedCategory] = useState(null); // Selected Category ID

  // Fetch all products and categories on page load
  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const productRes = await getAllProducts();
        setProducts(productRes.data.products);

        const categoryRes = await getAllCategory();
        if (categoryRes && categoryRes.caterogy) {
          setCategories(categoryRes.caterogy);
        } else {
          console.warn("No category data found in response:", categoryRes);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProductsAndCategories();
  }, []);

  // Handle category click
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.productCategory === selectedCategory)
    : products;

  return (
    <>
      <div className='co'>
        <div id='carouselExampleCaptions' className='carousel slide'>
          {/* Carousel code remains the same */}
        </div>
        <h2 className='container mt-1'>Available Categories</h2>
        <div className='row container'>
          {categories.map((singleCategory) => (
            <div
              className='col-6 col-sm-4 col-lg-3 col-xl-2 my-2'
              key={singleCategory.id}
            >
              <CategoryCard
                categoryInformation={singleCategory}
                onClick={() => handleCategoryClick(singleCategory.id)} // Handle click
              />
            </div>
          ))}
        </div>
        <div className='row container'>
          <h2 className='my-2'>Available Products</h2>
          {filteredProducts.map((singleProduct) => (
            <div
              className='col-12 col-sm-6 col-lg-4 col-xl-3 h-100'
              key={singleProduct.id}
            >
              <ProductCards productInformation={singleProduct} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Homepage;
