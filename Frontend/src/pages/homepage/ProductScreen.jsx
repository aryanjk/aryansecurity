// import React, { useEffect, useState } from "react";
// import { getAllProducts } from "../../apis/Api";
// import { sanitizeInput } from "../../common/inputSanitizer";
// import ProductCard from "../../components/product/ProductCard";
// import "./Style.css";

// const Pagination = ({ currentPage, totalPages, paginate }) => {
//   return (
//     <div className='pagination-container'>
//       <button
//         onClick={() => paginate(currentPage - 1)}
//         disabled={currentPage === 1}
//       >
//         &lt;
//       </button>
//       <span>Page</span>
//       <input
//         type='number'
//         value={currentPage}
//         onChange={(e) => paginate(Number(e.target.value))}
//         min='1'
//         max={totalPages}
//         className='page-input'
//       />
//       <span>of {totalPages}</span>
//       <button
//         onClick={() => paginate(currentPage + 1)}
//         disabled={currentPage === totalPages}
//       >
//         &gt;
//       </button>
//     </div>
//   );
// };

// const ProductScreen = () => {
//   const [products, setProducts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState(""); // State for search query
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 8;

//   useEffect(() => {
//     getAllProducts()
//       .then((res) => {
//         setProducts(res.data.products);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   // Filter products based on the search query
//   const filteredProducts = products.filter((product) =>
//     product.productName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Calculate the products to display on the current page
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = filteredProducts.slice(
//     indexOfFirstProduct,
//     indexOfLastProduct
//   );

//   const paginate = (pageNumber) => {
//     if (pageNumber < 1) pageNumber = 1;
//     if (pageNumber > Math.ceil(filteredProducts.length / productsPerPage))
//       pageNumber = Math.ceil(filteredProducts.length / productsPerPage);
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <>
//       <div className='ProductScreen container'>
//         <h4>All Products</h4>
//         <input
//           type='text'
//           placeholder='Search products...'
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(sanitizeInput(e.target.value))}
//           className='form-control mb-3'
//         />

//         <div className='row p-0 m-0'>
//           {currentProducts.length > 0 ? (
//             currentProducts.map((singleProduct, index) => (
//               <div
//                 key={index}
//                 className='col-12 col-sm-6 col-lg-4 col-xl-3 p-0 m-0'
//               >
//                 <ProductCard
//                   productInformation={singleProduct}
//                   color={"green"}
//                 />
//               </div>
//             ))
//           ) : (
//             <div>No products available</div>
//           )}
//         </div>

//         <Pagination
//           currentPage={currentPage}
//           totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
//           paginate={paginate}
//         />
//       </div>
//     </>
//   );
// };

// export default ProductScreen;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createProductApi,
  deleteProduct,
  getAllCategory,
  getAllProducts,
} from "../../apis/Api";
import SideNav from "../admin/SideNav";

const Product = () => {
  // State for all fetched products
  const [products, setProducts] = useState([]);
  // State for categories
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then((res) => setProducts(res.data.products))
      .catch((error) => console.log(error));

    getAllCategory()
      .then((res) => setCategories(res.caterogy))
      .catch((error) => console.log(error));
  }, []);

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");

  // State for images
  const [productImage, setProductImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  // Allowed image MIME types
  const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Validate file type
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        toast.error("Invalid file type! Please upload an image (JPEG, PNG, GIF, WEBP).");
        return;
      }

      // Validate file size (max 2MB)
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        toast.error("File size too large! Please upload an image smaller than 2MB.");
        return;
      }

      // If valid, update state
      setProductImage(file);
      setPreviewImage(URL.createObjectURL(file));
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

    createProductApi(formData)
      .then((res) => {
        if (res.status === 201) {
          toast.success(res.data.message);
        }
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message || "Something went wrong!");
        } else {
          toast.error("Something went wrong!");
        }
      });
  };

  const handleDelete = (id) => {
    const confirmDialog = window.confirm("Are you sure you want to delete?");
    if (confirmDialog) {
      deleteProduct(id)
        .then((res) => {
          if (res.status === 201) {
            toast.success(res.data.message);
            window.location.reload();
          }
        })
        .catch((error) => {
          toast.error(error.response?.data?.message || "Delete failed!");
        });
    }
  };

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
                  <form>
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
                      accept="image/*"
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
                  <button type='button' className='btn btn-primary' onClick={handleSubmit}>
                    Create Product
                  </button>
                </div>
              </div>
            </div>
            <div className='col-9'>
              <table className='table mt-2'>
                <thead className='table-dark'>
                  <tr>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                    <th>Category</th>
                    <th>Descriptions</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((singleProduct) => (
                    <tr key={singleProduct._id}>
                      <td>
                        <img width={"40px"} height={"40px"} src={`http://localhost:5500/products/${singleProduct.productImage}`} alt='' />
                      </td>
                      <td>{singleProduct.productName}</td>
                      <td>{singleProduct.productPrice}</td>
                      <td>{getCategoryNameById(singleProduct.productCategory)}</td>
                      <td>{singleProduct.productDescription}</td>
                      <td>
                        <Link to={`/admin/update/${singleProduct._id}`} className='btn btn-primary'>Edit</Link>
                        <button onClick={() => handleDelete(singleProduct._id)} className='btn btn-danger ms-2'>Delete</button>
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
