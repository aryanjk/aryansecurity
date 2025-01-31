import { message } from "antd";
import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

import { useParams } from "react-router-dom";
import { addToCartApi, getcaterogyById } from "../../apis/Api";
import "./ProductCard.css"; // Make sure to create and import this CSS file

const ProductCard = ({ productInformation }) => {
  const [categoryName, setCategoryName] = useState(""); // State to hold the category name

  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        const categoryRes = await getcaterogyById(
          productInformation.productCategory
        );
        setCategoryName(categoryRes.data.categoryName); // Set the category name
      } catch (err) {
        console.log("Error fetching category");
      }
    };

    fetchCategoryName();
  }, [productInformation.productCategory]);
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) =>
      prevQuantity > 1 ? prevQuantity - 1 : prevQuantity
    );
  };

  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleCartButton = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userID", user._id);
    formData.append("productID", productInformation._id);
    formData.append("productPrice", productInformation.productPrice);
    formData.append("quantity", quantity);
    console.log(formData);
    console.log(user._id);
    console.log(productInformation._id);
    console.log(productInformation.productPrice);
    console.log(quantity);

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
    <>
      <div className='product-card border-0 h-100 p-0 m-0 px-3 py-3 rounded'>
        <div className='d-flex rounded shadow flex-column justify-content-center rounded align-items-center h-100'>
          <div className='top-container col-12 p-0 h-50 w-100 m-0'>
            <a
              className='h-100 w-100'
              href={`/productdescription/${productInformation._id}`}
            >
              <img
                className='w-100 h-100 object-fit-cover rounded'
                src={`http://localhost:5500/products/${productInformation.productImage}`}
                alt={productInformation.productName}
              />
            </a>
          </div>
          <div className='bottom-container h-50 m-0 w-100 px-2 pt-2 pb-5 position-relative'>
            <h5 className='w-100 text-start '>
              {productInformation.productName}
            </h5>
            <p className='text-truncate text-start w-100'>
              {productInformation.productDescription}
            </p>
            <p
              className='px-2 m-0 bg-danger position-absolute text-white rounded'
              style={{ top: "-30px", right: "5px" }}
            >
              {categoryName}
            </p>
            {/* <div className='quantity-control'>
              <span>Qty</span>
              <button onClick={decreaseQuantity} className='quantity-btn'>
                -
              </button>
              <span>{quantity}</span>
              <button onClick={increaseQuantity} className='quantity-btn'>
                +
              </button>
            </div>
            <div className='price'>
              <span>Price</span>
              <h5 className='price-text'>
                NPR.{productInformation.productPrice}
              </h5>
            </div> */}
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
            <button
              onClick={handleCartButton}
              className='btn btn-sm w-100 btn-outline-dark'
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
