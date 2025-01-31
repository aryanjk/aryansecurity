import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createProductApi,
  deleteProduct,
  getAllCategory,
  getAllProducts,
} from "../../../apis/Api";
import SideNav from "../SideNav";

const Product = () => {
  // State for all fetched products
  const [products, setProducts] = useState([]); // array

  // State for categories
  const [categories, setCategories] = useState([]); // array

  // Call API initially (PageLoad) - Set all fetched products and categories to state
  useEffect(() => {
    getAllProducts()
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((error) => {
        console.log(error);
      });

    getAllCategory()
      .then((res) => {
        console.log("Fetched categories:", res.caterogy);
        setCategories(res.caterogy); // Fetch categories and set to state
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(products);
  console.log(categories);

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");

  // State for images
  const [productImage, setProductImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        toast.error("Only JPG, PNG, GIF, and WEBP images are allowed.");
        return;
      }
      // Validate file size (max 2MB)
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        toast.error("File size too large! Please upload an image smaller than 2MB.");
        return;
      }
      setProductImage(file); // for backend
      setPreviewImage(URL.createObjectURL(file)); // for preview
    }

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productCategory", productCategory);
    formData.append("productDescription", productDescription);
    formData.append("productImage", productImage);

    // Make an API call
    createProductApi(formData)
      .then((res) => {
        if (res.status === 201) {
          toast.success(res.data.message);
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            toast.warning(error.response.data.message);
          } else if (error.response.status === 500) {
            toast.warning(error.response.data.message);
          } else {
            toast.error("Something went wrong!");
          }
        } else {
          toast.error("Something went wrong!");
        }
      });
  };

  // delete
  const handleDelete = (id) => {
    const confirmDialog = window.confirm("Are you sure you want to delete?");
    if (confirmDialog) {
      // calling api
      deleteProduct(id)
        .then((res) => {
          if (res.status === 201) {
            toast.success(res.data.message);
            // reload
            window.location.reload();
          }
        })
        .catch((error) => {
          if (error.response.status === 500) {
            toast.error(error.res.data.message);
          }
        });
    }
  };

  // Helper function to get category name by ID
  const getCategoryNameById = (id) => {
    const category = categories.find((cat) => cat._id === id);
    return category ? category.categoryName : "Unknown Category";
  };

  return (
    <>
      <div className='container-fluid full-page'>
        <div className='row h-100'>
          <SideNav />
          <div className='col-md-9 col-lg-10 row my-3'>
            <div className='col-md-3 col-lg-3 d-flex justify-content-center align-items-center'>
              <div className='card card-form border-0 shadow'>
                <div className='card-header bg-white'>
                  <h1 className='fs-5 text-dark m-0 text-decoration-underline w-100 text-center'>
                    Create a new Product
                  </h1>
                </div>
                <div className='card-body'>
                  <form action=''>
                    <label>Product Name</label>
                    <input
                      onChange={(e) => setProductName(e.target.value)}
                      type='text'
                      className='form-control'
                      placeholder='Enter product name'
                    />

                    <label className='mt-2'>Product Price</label>
                    <input
                      onChange={(e) => setProductPrice(e.target.value)}
                      type='number'
                      className='form-control'
                      placeholder='Enter Product Price'
                    />

                    <label className='mt-2'>Choose the category</label>
                    <select
                      onChange={(e) => setProductCategory(e.target.value)}
                      className='form-control'
                    >
                      <option value=''>Select Category</option>
                      {categories?.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.categoryName}
                        </option>
                      ))}
                    </select>

                    <label className='mt-2'>Enter Description</label>
                    <textarea
                      onChange={(e) => setProductDescription(e.target.value)}
                      className='form-control'
                    ></textarea>

                    <label className='mt-2'>Choose Image</label>
                    <input
                      onChange={handleImage}
                      type='file'
                      className='form-control'
                      id='categoryImage'
                    />

                    {previewImage && (
                      <img
                        src={previewImage}
                        className='img-fluid rounded object-cover mt-2'
                        alt='Preview'
                      />
                    )}
                  </form>
                </div>
                <div className='card-footer'>
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={handleSubmit}
                  >
                    Create Product
                  </button>
                </div>
              </div>
            </div>
            <div className='col-9'>
              <table className='table mt-2'>
                <thead className='table-dark'>
                  <tr>
                    <th scope='col'>Product Image</th>
                    <th scope='col'>Product Name</th>
                    <th scope='col'>Product Price</th>
                    <th scope='col'>Category</th>
                    <th scope='col'>Descriptions</th>
                    <th scope='col'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((singleProduct) => (
                    <tr key={singleProduct._id}>
                      <td>
                        <img
                          width={"40px"}
                          height={"40px"}
                          src={`http://localhost:5500/products/${singleProduct.productImage}`}
                          alt=''
                        />
                      </td>
                      <td>{singleProduct.productName}</td>
                      <td>{singleProduct.productPrice}</td>
                      {/* Show category name by finding it from the categories array */}
                      <td>
                        {getCategoryNameById(singleProduct.productCategory)}
                      </td>
                      <td>{singleProduct.productDescription}</td>
                      <td>
                        <Link
                          to={`/admin/update/${singleProduct._id}`}
                          className='btn btn-primary'
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(singleProduct._id)}
                          className='btn btn-danger ms-2'
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
