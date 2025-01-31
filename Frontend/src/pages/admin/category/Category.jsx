// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import {
//   createCategoryApi,
//   deleteCategory,
//   getAllCategory,
// } from "../../../apis/Api";
// import SideNav from "../SideNav";
// import "./Category.css";

// const Category = () => {
//   const [category, setCategory] = useState([]); // Initialize as an empty array

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await getAllCategory();
//         console.log("Fetched categories:", res); // Log the fetched data
//         if (res && res.caterogy) {
//           // Corrected the typo here
//           setCategory(res.caterogy);
//         } else {
//           console.warn("No category data found in response:", res);
//         }
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   // State for input fields
//   const [categoryName, setCategoryName] = useState("");
//   const [categoryDescription, setCategoryDescription] = useState("");

//   // State for images
//   const [categoryImage, setCategoryImage] = useState("");
//   const [previewImage, setPreviewImage] = useState("");

//   // Image upload handler
//   const handleImage = (event) => {
//     const file = event.target.files[0];
//     setCategoryImage(file); // For backend
//     setPreviewImage(URL.createObjectURL(file)); // For preview
//   };

//   // Handle submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Make a form data (text, files)
//     const formData = new FormData();
//     formData.append("categoryName", categoryName);
//     formData.append("categoryDescription", categoryDescription);
//     formData.append("categoryImage", categoryImage);

//     try {
//       const res = await createCategoryApi(formData);
//       console.log("Category creation response:", res); // Log the response
//       if (res.status === 201) {
//         toast.success(res.data.message);
//         // Optionally refresh the category list
//         const newRes = await getAllCategory();
//         setCategory(newRes.caterogy); // Corrected the typo here
//       } else {
//         toast.error("Failed to create category.");
//       }
//     } catch (error) {
//       console.error("Error creating category:", error);
//       if (error.response) {
//         if (error.response.status === 400) {
//           toast.warning(error.response.data.message);
//         } else if (error.response.status === 500) {
//           toast.warning(error.response.data.message);
//         } else {
//           toast.error("Something went wrong!");
//         }
//       } 
//       else {
//         toast.error("Something went wrong!");
//       }
//     }
//   };
//   const handleDelete = (id) => {
//     const confirmDialog = window.confirm("Are you sure u want to delete?");
//     if (confirmDialog) {
//       // call api
//       deleteCategory(id)
//         .then((res) => {
//           if (res.status === 201) {
//             toast.success(res.data.message);
//             // reload
//             window.location.reload();
//           }
//         })
//         .catch((error) => {
//           if (error.response.status === 500) {
//             toast.error(error.res.data.message);
//           }
//         });
//     }
//   };

//   return (
//     <>
//       <div className='w-100 h-100 p-3 full-page'>
//         <div className='row h-100'>
//           <SideNav />
//           <div className='col-md-9 col-lg-10'>
//             {/* <div className='column'> */}
//             <div className='col-md-9 col-lg-10 d-flex justify-content-center align-items-center border col'>
//               <div className='card card-form border-0 shadow col-3'>
//                 <div className='card-header text-center bg-white border-0'>
//                   <h1 className='fs-5 text-dark text-decoration-underline m-0'>
//                     Create a new Category
//                   </h1>
//                 </div>
//                 <div className='card-body'>
//                   <form onSubmit={handleSubmit}>
//                     <div className='mb-3'>
//                       <label htmlFor='categoryName' className='form-label'>
//                         Category Name
//                       </label>
//                       <input
//                         type='text'
//                         className='form-control'
//                         id='categoryName'
//                         placeholder='Enter Category name'
//                         onChange={(e) => setCategoryName(e.target.value)}
//                         required
//                       />
//                     </div>
//                     <div className='mb-3'>
//                       <label
//                         htmlFor='categoryDescription'
//                         className='form-label'
//                       >
//                         Enter Description
//                       </label>
//                       <textarea
//                         className='form-control'
//                         id='categoryDescription'
//                         rows='3'
//                         onChange={(e) => setCategoryDescription(e.target.value)}
//                         required
//                       ></textarea>
//                     </div>
//                     <div className='mb-3'>
//                       <label htmlFor='categoryImage' className='form-label'>
//                         Choose Image
//                       </label>
//                       <input
//                         type='file'
//                         className='form-control'
//                         id='categoryImage'
//                         onChange={handleImage}
//                         required
//                       />
//                     </div>
//                     {previewImage && (
//                       <img
//                         src={previewImage}
//                         className='img-fluid rounded object-cover mt-2'
//                         alt='Preview'
//                       />
//                     )}
//                     <div className='card-footer'>
//                       <button type='submit' className='btn btn-primary'>
//                         Create Category
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//               <div className='col-9 h-100'>
//                 <table className='table ms-2 mt-2 h-100'>
//                   <thead className='table-dark h-100'>
//                     <tr>
//                       <th scope='col'>Category Image</th>
//                       <th scope='col'>Category Name</th>
//                       <th scope='col'>Descriptions</th>
//                       <th scope='col'>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {category.length > 0 ? (
//                       category.map((singleCategory) => (
//                         <tr key={singleCategory._id}>
//                           <td>
//                             <img
//                               width={"40px"}
//                               height={"40px"}
//                               src={`http://localhost:5500/category/${singleCategory.categoryImage}`}
//                               alt=''
//                             />
//                           </td>
//                           <td>{singleCategory.categoryName}</td>
//                           <td>{singleCategory.categoryDescription}</td>
//                           <td>
//                             {/* <Link to={`/admin/category/update/${singleCategory._id}`} className="btn btn-primary">Edit</Link> */}
//                             <button
//                               onClick={() => handleDelete(singleCategory._id)}
//                               className='btn btn-danger ms-2'
//                             >
//                               Delete
//                             </button>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan='4' className='text-center'>
//                           No categories found.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//           {/* </div> */}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Category;
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createCategoryApi,
  deleteCategory,
  getAllCategory,
} from "../../../apis/Api";
import SideNav from "../SideNav";
import "./Category.css";

const Category = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategory();
        if (res && res.caterogy) {
          setCategory(res.caterogy);
        } else {
          console.warn("No category data found in response:", res);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // State for input fields
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  // State for images
  const [categoryImage, setCategoryImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  // Allowed image MIME types
  const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

  const handleImage = (event) => {
    const file = event.target.files[0];

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
      setCategoryImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("categoryName", categoryName);
    formData.append("categoryDescription", categoryDescription);
    formData.append("categoryImage", categoryImage);

    try {
      const res = await createCategoryApi(formData);
      if (res.status === 201) {
        toast.success(res.data.message);
        const newRes = await getAllCategory();
        setCategory(newRes.caterogy);
      } else {
        toast.error("Failed to create category.");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Something went wrong!");
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  const handleDelete = (id) => {
    const confirmDialog = window.confirm("Are you sure you want to delete?");
    if (confirmDialog) {
      deleteCategory(id)
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

  return (
    <>
      <div className='w-100 h-100 p-3 full-page'>
        <div className='row h-100'>
          <SideNav />
          <div className='col-md-9 col-lg-10'>
            <div className='col-md-9 col-lg-10 d-flex justify-content-center align-items-center border col'>
              <div className='card card-form border-0 shadow col-3'>
                <div className='card-header text-center bg-white border-0'>
                  <h1 className='fs-5 text-dark text-decoration-underline m-0'>
                    Create a new Category
                  </h1>
                </div>
                <div className='card-body'>
                  <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                      <label htmlFor='categoryName' className='form-label'>Category Name</label>
                      <input
                        type='text'
                        className='form-control'
                        id='categoryName'
                        placeholder='Enter Category name'
                        onChange={(e) => setCategoryName(e.target.value)}
                        required
                      />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='categoryDescription' className='form-label'>Enter Description</label>
                      <textarea
                        className='form-control'
                        id='categoryDescription'
                        rows='3'
                        onChange={(e) => setCategoryDescription(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='categoryImage' className='form-label'>Choose Image</label>
                      <input
                        type='file'
                        className='form-control'
                        id='categoryImage'
                        onChange={handleImage}
                        accept="image/*"
                        required
                      />
                    </div>
                    {previewImage && (
                      <img
                        src={previewImage}
                        className='img-fluid rounded object-cover mt-2'
                        alt='Preview'
                      />
                    )}
                    <div className='card-footer'>
                      <button type='submit' className='btn btn-primary'>Create Category</button>
                    </div>
                  </form>
                </div>
              </div>
              <div className='col-9 h-100'>
                <table className='table ms-2 mt-2 h-100'>
                  <thead className='table-dark h-100'>
                    <tr>
                      <th>Category Image</th>
                      <th>Category Name</th>
                      <th>Descriptions</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.length > 0 ? (
                      category.map((singleCategory) => (
                        <tr key={singleCategory._id}>
                          <td>
                            <img width={"40px"} height={"40px"} src={`http://localhost:5500/category/${singleCategory.categoryImage}`} alt='' />
                          </td>
                          <td>{singleCategory.categoryName}</td>
                          <td>{singleCategory.categoryDescription}</td>
                          <td>
                            <button onClick={() => handleDelete(singleCategory._id)} className='btn btn-danger ms-2'>Delete</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan='4' className='text-center'>No categories found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
