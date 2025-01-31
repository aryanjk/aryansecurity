import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { deleteProduct, getAllProducts, getcaterogyById } from "../../apis/Api";
import SideNav from "./SideNav"; // Adjust the path based on your file structure

const AdminDashboard = () => {
    // State for all fetched products
    const [products, setProducts] = useState([]); // array

    // State for categories mapping
    const [categoryNames, setCategoryNames] = useState({}); // object to map category IDs to names

    // Fetch all products and set them to state
    useEffect(() => {
        getAllProducts().then((res) => {
            setProducts(res.data.products);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    // Fetch category names based on product category IDs
    useEffect(() => {
        const fetchCategoryNames = async () => {
            const categoryMap = {};
            for (const product of products) {
                if (!categoryMap[product.productCategory]) {  // Avoid re-fetching for the same category ID
                    try {
                        const res = await getcaterogyById(product.productCategory);
                        categoryMap[product.productCategory] = res.data.categoryName;
                    } catch (error) {
                        console.log(`Error fetching category name for ID ${product.productCategory}:`, error);
                        categoryMap[product.productCategory] = 'Unknown Category';
                    }
                }
            }
            setCategoryNames(categoryMap);
        };

        if (products.length > 0) {
            fetchCategoryNames();
        }
    }, [products]);

    // Handle delete
    const handleDelete = (id) => {
        const confirmDialog = window.confirm("Are you sure you want to delete?");
        if (confirmDialog) {
            deleteProduct(id).then((res) => {
                if (res.status === 201) {
                    toast.success(res.data.message);
                    window.location.reload();
                }
            }).catch((error) => {
                if (error.response.status === 500) {
                    toast.error(error.response.data.message);
                }
            });
        }
    };

    return (
        <>
            <div className="container-fluid mt-3">
                <div className="row">
                    <SideNav />
                    <div className="col-md-9 col-lg-10">
                        <div className="container mt-3">
                            <table className="table mt-2">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">Product Image</th>
                                        <th scope="col">Product Name</th>
                                        <th scope="col">Product Price</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Descriptions</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products?.map((singleProduct) => (
                                            <tr key={singleProduct._id}>
                                                <td>
                                                    <img
                                                        width={"40px"}
                                                        height={"40px"}
                                                        src={`http://localhost:5500/products/${singleProduct.productImage}`}
                                                        alt=""
                                                    />
                                                </td>
                                                <td>{singleProduct.productName}</td>
                                                <td>{singleProduct.productPrice}</td>
                                                <td>{categoryNames[singleProduct.productCategory] || 'Loading...'}</td>
                                                <td>{singleProduct.productDescription}</td>
                                                <td>
                                                    <Link to={`/admin/update/${singleProduct._id}`} className="btn btn-secondary" style={{ backgroundColor: 'brown', color: 'white' }}>Edit</Link>
                                                    <button onClick={() => handleDelete(singleProduct._id)}
                                                        className="btn btn-danger ms-2">Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
