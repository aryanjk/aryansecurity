import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addToCartApi, createReviewApi, getcaterogyById, getReviewsByProductID, getSingleProduct, getUserDataById } from '../../../apis/Api';
import StarRating from '../../../components/star/StarRating';
import './ProductDescription.css';

const ProductDescription = () => {
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('user'));

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [oldImage, setOldImage] = useState('');
    const [previewNewImage, setPreviewNewImage] = useState(null);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [reviews, setReviews] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : prevQuantity));
    };

    useEffect(() => {
        const fetchProductAndReviews = async () => {
            try {
                const res = await getSingleProduct(id);
                const product = res.data.product;
                console.log(product);

                setProductName(product.productName);
                setProductPrice(product.productPrice);
                setProductDescription(product.productDescription);
                setOldImage(product.productImage);

                const categoryRes = await getcaterogyById(product.productCategory);
                setProductCategory(categoryRes.data.categoryName);
                console.log(categoryRes.data.categoryName);

                const reviewsRes = await getReviewsByProductID(id);
                console.log("Review response", reviewsRes);

                const reviewsWithUserNames = await Promise.all(
                    reviewsRes.data.review.map(async (review) => {
                        console.log(review);
                        const userRes = await getUserDataById(review.userID);
                        console.log(userRes.data.user.firstname);
                        return {
                            ...review,
                            userName: userRes.data.user.firstname,
                        };
                    })
                );

                setReviews(reviewsWithUserNames);
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch product details or reviews.");
            }
        };

        fetchProductAndReviews();
    }, []);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('userID', user.id);
        formData.append('productID', id);
        formData.append('review', review);
        formData.append('rating', rating);

        createReviewApi(formData)
            .then((res) => {
                if (res.data.success) {
                    toast.success(res.data.message);
                    setReviews((prevReviews) => [...prevReviews, { rating, text: review, userName: user.name }]);
                    setReview('');
                    setRating(0);
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                toast.error('Server Error');
                console.error(err.message);
            });
    };

    const handleAddToCart = () => {
        const formData = new FormData();
        formData.append('userID', user._id);
        formData.append('productID', id);
        formData.append('productPrice', productPrice);
        formData.append('quantity', quantity);

        addToCartApi(formData)
            .then((res) => {
                if (res.data.success) {
                    toast.success("Item added to cart successfully!");
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                toast.error('Server Error');
                console.error(err.message);
            });
    };

    const handleBuyNow = () => {
        const formData = new FormData();
        formData.append('userID', user._id);
        formData.append('productID', id);
        formData.append('productPrice', productPrice);
        formData.append('quantity', 1);

        addToCartApi(formData)
            .then((res) => {
                if (res.data.success) {
                    toast.success("Item added to cart successfully!");
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                toast.error('Server Error');
                console.error(err.message);
            });
    };

    return (
        <div className="container product-description">
            <div className="product-details">
                <h2>{productName}</h2>
                <div className="d-flex flex-wrap gap-3">
                    <div className="image-section">
                        <img className="img-fluid rounded-2" src={`http://localhost:5500/products/${oldImage}`} alt={productName} />
                        {previewNewImage && (
                            <>
                                <h6 className="mt-3">Previewing New Image</h6>
                                <img className="img-fluid rounded-2" src={previewNewImage} alt="Preview" />
                            </>
                        )}
                    </div>
                    <div className="product-info">
                        <h2>{productName}</h2>
                        <h3 className="mt-2">Product Price: Rs.{productPrice}</h3>
                        <h4 className="mt-2">Category: {productCategory}</h4>
                        <h5 className="mt-2">Description</h5>
                        <p>{productDescription}</p>
                        <div className="quantity-control">
                            <span>Qty</span>
                            <button type="button" onClick={decreaseQuantity} className="quantity-btn">-</button>
                            <span>{quantity}</span>
                            <button type="button" onClick={increaseQuantity} className="quantity-btn">+</button>
                        </div>
                        <button type="button" onClick={handleAddToCart} className="btn btn-danger w-100 mt-3">Add to cart</button>
                    </div>
                </div>
            </div>

            <div className="reviews-section mt-4">
                <form onSubmit={handleReviewSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Your Review:</label>
                        <input
                            name="comment"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            className="form-control"
                        />
                        <StarRating rating={rating} value={rating} onRatingChange={handleRatingChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit Review</button>
                </form>

                <div className="mt-4">
                    <h4>Customer Reviews</h4>
                    {reviews.length === 0 ? (
                        <p>No reviews yet.</p>
                    ) : (
                        reviews.map((review, index) => (
                            <div key={index} className="col">
                                <div className="review-item mb-3">
                                    <StarRating rating={review.rating} />
                                    <p className="review-text mt-2"><strong>{review.userName}:</strong> {review.text || review.review}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDescription;
