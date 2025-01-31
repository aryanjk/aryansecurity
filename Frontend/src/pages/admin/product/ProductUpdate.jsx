// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import { getAllCategory, getSingleProduct, updateProduct } from '../../../apis/Api'

// const UpdateProduct = () => {
//     // get id from url
//     const { id } = useParams()

//     // State for categories
//     const [categories, setCategories] = useState([]); // array

//     // get product information (Backend)
//     useEffect(() => {
//         getSingleProduct(id).then((res) => {
//             console.log(res.data);
//             // res->data(message ,success,product)
//             // res.data.product.productName

//             setProductName(res.data.product.productName)
//             setProductPrice(res.data.product.productPrice)
//             setProductCategory(res.data.product.productCategory)
//             setProductDescription(res.data.product.productDescription)
//             setOldImage(res.data.product.productImage)


//         }).catch((error) => {
//             console.log(error)
//         });
//         getAllCategory().then((res) => {
//             console.log("Fetched categories:", res.caterogy);
//             setCategories(res.caterogy); // Fetch categories and set to state
//         }).catch((error) => {
//             console.log(error);
//         });
//     }, [])
//     // fill all the info in each fields



//     // make a use state
//     const [productName, setProductName] = useState('')
//     const [productPrice, setProductPrice] = useState('')
//     const [productCategory, setProductCategory] = useState('')
//     const [productDescription, setProductDescription] = useState('')

//     // state for image
//     const [productNewImage, setProductNewImage] = useState(null)
//     const [previewNewImage, setPreviewNewImage] = useState(null)
//     const [oldImage, setOldImage] = useState('')

//     // image upload handler
//     const handleImage = (event) => {
//         const file = event.target.files[0]
//         setProductNewImage(file) // for backend
//         setPreviewNewImage(URL.createObjectURL(file))

//     }
//     // update product
//     const handleUpdate = (e) => {
//         e.preventDefault();

//         //make a form data 
//         const formData = new FormData()
//         formData.append('productName', productName)
//         formData.append('productPrice', productPrice)
//         formData.append('productCategory', productCategory)
//         formData.append('productDescription', productDescription)

//         if (productNewImage) {
//             formData.append('productImage', productNewImage)
//         }

//         // API call
//         updateProduct(id, formData).then((res) => {
//             if (res.status === 201) {
//                 toast.success(res.data.message)
//             }
//         }).catch((error) => {
//             if (error.response.status === 500) {
//                 toast.error(error.response.data.message)
//             }
//             else if (error.response.status === 400) {
//                 toast.error(error.response.data.message)
//             }
//         })

//     }

//     return (
//         <>
//             <div className='container mt-3'>

//                 <h2>Update product for <span className='text-danger'>'{productName}'</span></h2>

//                 <div className='d-flex gap-3'>
//                     <form action="">
//                         <label htmlFor="">Product Name</label>
//                         <input value={productName} onChange={(e) => setProductName(e.target.value)} className='form-control' type="text" placeholder='Enter your product name' />

//                         <label className='mt-2' htmlFor="">Product Price</label>
//                         <input value={productPrice} onChange={(e) => setProductPrice(e.target.value)} className='form-control' type="number" placeholder='Enter your product name' />

//                         <label className='mt-2'>Choose category</label>
//                         <select value={productCategory} onChange={(e) => setProductCategory(e.target.value)} className='form-control'>
//                             <option value="">Select Category</option>
//                             {categories?.map((category) => (
//                                 <option key={category._id} value={category.categoryName}>
//                                     {category.categoryName}
//                                 </option>
//                             ))}
//                         </select>

//                         <label className='mt-2'>Enter description</label>
//                         <textarea value={productDescription} onChange={(e) => setProductDescription(e.target.value)} className='form-control'></textarea>

//                         <label className='mt-2'>Choose product Image</label>
//                         <input onChange={handleImage} type="file" className='form-control' />

//                         <button onClick={handleUpdate} className='btn btn-danger w-100 mt-2'>Update Product</button>


//                     </form>
//                     <div className='image section'>
//                         <h6>Previewing old images</h6>
//                         <img height={'150px'} width={'250px'} className='image-fluid rounded-4 object-fit-cover' src={`http://localhost:5500/products/${oldImage}`} alt=''></img>
//                         {
//                             previewNewImage && <>
//                                 <h6>New Image</h6>
//                                 <img height={'150px'} width={'250px'} className='image-fluid rounded-4 object-fit-cover' src={previewNewImage} accessKey=''></img>
//                             </>
//                         }
//                     </div>
//                 </div>

//             </div>
//         </>
//     )
// }


// export default UpdateProduct
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllCategory, getSingleProduct, updateProduct } from '../../../apis/Api';

const UpdateProduct = () => {
    // Get product ID from URL
    const { id } = useParams();

    // State for categories
    const [categories, setCategories] = useState([]);

    // Product states
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productNewImage, setProductNewImage] = useState(null);
    const [previewNewImage, setPreviewNewImage] = useState(null);
    const [oldImage, setOldImage] = useState('');

    // Allowed image MIME types
    const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    useEffect(() => {
        getSingleProduct(id).then((res) => {
            setProductName(res.data.product.productName);
            setProductPrice(res.data.product.productPrice);
            setProductCategory(res.data.product.productCategory);
            setProductDescription(res.data.product.productDescription);
            setOldImage(res.data.product.productImage);
        }).catch((error) => console.log(error));

        getAllCategory().then((res) => {
            setCategories(res.caterogy);
        }).catch((error) => console.log(error));
    }, [id]);

    // Image Upload Handler with Validation
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
            setProductNewImage(file);
            setPreviewNewImage(URL.createObjectURL(file));
        }
    };

    // Update Product Handler
    const handleUpdate = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('productPrice', productPrice);
        formData.append('productCategory', productCategory);
        formData.append('productDescription', productDescription);

        if (productNewImage) {
            formData.append('productImage', productNewImage);
        }

        updateProduct(id, formData).then((res) => {
            if (res.status === 201) {
                toast.success(res.data.message);
            }
        }).catch((error) => {
            if (error.response?.status === 500) {
                toast.error(error.response.data.message);
            } else if (error.response?.status === 400) {
                toast.error(error.response.data.message);
            }
        });
    };

    return (
        <div className='container mt-3'>
            <h2>Update product for <span className='text-danger'>'{productName}'</span></h2>

            <div className='d-flex gap-3'>
                <form>
                    <label>Product Name</label>
                    <input value={productName} onChange={(e) => setProductName(e.target.value)} className='form-control' type="text" placeholder='Enter product name' />

                    <label className='mt-2'>Product Price</label>
                    <input value={productPrice} onChange={(e) => setProductPrice(e.target.value)} className='form-control' type="number" placeholder='Enter product price' />

                    <label className='mt-2'>Choose category</label>
                    <select value={productCategory} onChange={(e) => setProductCategory(e.target.value)} className='form-control'>
                        <option value="">Select Category</option>
                        {categories?.map((category) => (
                            <option key={category._id} value={category.categoryName}>
                                {category.categoryName}
                            </option>
                        ))}
                    </select>

                    <label className='mt-2'>Enter description</label>
                    <textarea value={productDescription} onChange={(e) => setProductDescription(e.target.value)} className='form-control'></textarea>

                    <label className='mt-2'>Choose product Image</label>
                    <input onChange={handleImage} type="file" className='form-control' accept="image/*" />

                    <button onClick={handleUpdate} className='btn btn-danger w-100 mt-2'>Update Product</button>
                </form>

                <div className='image-section'>
                    <h6>Previewing old images</h6>
                    <img height={'150px'} width={'250px'} className='image-fluid rounded-4 object-fit-cover' src={`http://localhost:5500/products/${oldImage}`} alt='Old Product' />
                    {previewNewImage && (
                        <>
                            <h6>New Image</h6>
                            <img height={'150px'} width={'250px'} className='image-fluid rounded-4 object-fit-cover' src={previewNewImage} alt='New Product' />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;
