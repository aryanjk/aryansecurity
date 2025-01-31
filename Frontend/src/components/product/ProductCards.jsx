import { message } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { addToCartApi, getcaterogyById } from "../../apis/Api";

const ProductCards = ({ productInformation }) => {
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [categoryName, setCategoryName] = useState(""); // State to hold the category name

  const user = JSON.parse(localStorage.getItem("user"));

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) =>
      prevQuantity > 1 ? prevQuantity - 1 : prevQuantity
    );
  };

  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        const categoryRes = await getcaterogyById(
          productInformation.productCategory
        );
        setCategoryName(categoryRes.data.categoryName); // Set the category name
      } catch (err) {
        setError("Error fetching category");
      }
    };

    fetchCategoryName();
  }, [productInformation.productCategory]);

  const handleCartButton = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userID", user._id);
    formData.append("productID", productInformation._id);
    formData.append("productPrice", productInformation.productPrice);
    formData.append("quantity", quantity);

    addToCartApi(formData)
      .then((res) => {
        if (res.data.success === false) {
          message.success(res.data.message);
        } else {
          message.success(res.data.message);
        }
      })
      .catch((err) => {
        message.error("Server Error");
        console.log(err.message);
      });
  };

  return (
    <div className='card border-0 shadow h-100 w-100'>
      <span
        style={{ backgroundColor: "#a52626" }}
        className='badge position-absolute top-0'
      >
        {categoryName}
      </span>
      <img
        // height={"200px"}
        src={`http://localhost:5500/products/${productInformation.productImage}`}
        className='card-img-top h-50 w-100 object-fit-cover'
        alt={productInformation.productName}
      />
      <div className='card-body'>
        <div className='d-flex flex-column justify-content-between align-items-center'>
          <h5 className='card-title'>{productInformation.productName}</h5>

          <div className='d-flex w-100 align-items-center justify-content-between'>
            <div className='quantity-control d-flex flex-column'>
              <div>
                <button
                  onClick={decreaseQuantity}
                  className='quantity-btn bg-white'
                >
                  <FaMinus />
                </button>
                <span style={{ fontSize: "0.8rem" }}>{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className='quantity-btn bg-white'
                >
                  <FaPlus />
                </button>
              </div>
              <span
                className='text-secondary mt-1'
                style={{ fontSize: "0.8rem" }}
              >
                Quantity
              </span>
            </div>
            <div className='d-flex flex-column justify-content-center align-items-center'>
              <h5 className='card-title text-success'>
                NPR {productInformation.productPrice}
              </h5>
              <span className='text-secondary' style={{ fontSize: "0.8rem" }}>
                Price
              </span>
            </div>
          </div>
        </div>
        <p className='text-truncate'>{productInformation.productDescription}</p>

        {error && <div className='alert alert-danger mt-2'>{error}</div>}

        <div className='d-flex justify-content-between align-items-center '>
          <Link
            to={`/productdescription/${productInformation._id}`}
            className='btn btn-sm btn-outline-danger m-0 w-100'
          >
            View Product
          </Link>
          <button
            onClick={(e) => handleCartButton(e)}
            className='btn btn-sm btn-outline-warning w-100'
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCards;
