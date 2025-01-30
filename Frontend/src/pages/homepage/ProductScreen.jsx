import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../apis/Api";
import ProductCard from "../../components/product/ProductCard";
import "./Style.css";

const Pagination = ({ currentPage, totalPages, paginate }) => {
  return (
    <div className="pagination-container">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      <span>Page</span>
      <input
        type="number"
        value={currentPage}
        onChange={(e) => paginate(Number(e.target.value))}
        min="1"
        max={totalPages}
        className="page-input"
      />
      <span>of {totalPages}</span>
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

const ProductScreen = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate the products to display on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => {
    if (pageNumber < 1) pageNumber = 1;
    if (pageNumber > Math.ceil(filteredProducts.length / productsPerPage))
      pageNumber = Math.ceil(filteredProducts.length / productsPerPage);
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="ProductScreen container">
        <h4>All Products</h4>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control mb-3"
        />

        <div className="row p-0 m-0">
          {currentProducts.length > 0 ? (
            currentProducts.map((singleProduct, index) => (
              <div
                key={index}
                className="col-12 col-sm-6 col-lg-4 col-xl-3 p-0 m-0"
              >
                <ProductCard
                  productInformation={singleProduct}
                  color={"green"}
                />
              </div>
            ))
          ) : (
            <div>No products available</div>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
          paginate={paginate}
        />
      </div>
    </>
  );
};

export default ProductScreen;
