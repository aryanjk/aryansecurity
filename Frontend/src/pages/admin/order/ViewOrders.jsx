import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getAllOrdersApi,
  getSingleProduct,
  updateOrderApi,
} from "../../../apis/Api";
import OrderDetailsModal from "./OrderDetailModel";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [productsCache, setProductsCache] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrdersApi();
        console.log("Fetched Orders:", data);
        setOrders(data.data.orders); // Ensure orders is always an array
      } catch (err) {
        console.error("Error fetching orders:", err);
        toast.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (orders.length === 0) return;

      const productPromises = orders.flatMap((order) =>
        (order.carts || []).map(async (item) => {
          const productId = item.productID;
          if (!productsCache[productId]) {
            try {
              const product = await getSingleProduct(productId);
              console.log(product.data.product);
              console.log("Fetched Product Details:", product.data.product);
              setProductsCache((prev) => ({
                ...prev,
                [productId]: product.data.product,
              }));
              return { productId, product: product.data.product };
            } catch (error) {
              console.error("Error fetching product details:", error);
              return {
                productId,
                product: { productName: "Unknown", price: 0 },
              }; // Fallback in case of error
            }
          }
          return { productId, product: productsCache[productId] };
        })
      );

      await Promise.all(productPromises);
    };

    fetchProductDetails();
  }, [orders]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const updatedOrder = orders.find((order) => order._id === orderId);
      if (updatedOrder) {
        updatedOrder.status = newStatus;
        await updateOrderApi(orderId, { status: newStatus });
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? updatedOrder : order
          )
        );
        toast.success("Order status updated successfully");
      }
    } catch (err) {
      console.error("Error updating order status:", err);
      toast.error("Failed to update order status");
    }
  };

  const handleViewClick = (order) => {
    setSelectedOrder(order);
    setModalShow(true);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* <AdminNav /> */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Details</th>
                  <th>Products</th>
                  <th>Total</th>
                  <th>Payment Method</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <p>Order Id: {order._id}</p>
                      <p>
                        User Name: {order.userId.firstname}{" "}
                        {order.userId.lastname}
                      </p>
                      <p>Phone Number: {order.userId.phone}</p>
                      <p>Address: {order.address}</p>
                    </td>
                    <td>
                      {order.carts &&
                      Array.isArray(order.carts) &&
                      order.carts.length > 0 ? (
                        order.carts.map((item) => {
                          const product = productsCache[item.productID];
                          return product ? (
                            <div key={item._id}>
                              <p>
                                Product Name: {product.productName || "Unknown"}
                              </p>
                              <p>Quantity: {item.quantity}</p>
                              <p>Price: {product.productPrice || 0}</p>
                            </div>
                          ) : (
                            <p key={item._id}>Product details loading...</p>
                          );
                        })
                      ) : (
                        <p>No products</p>
                      )}
                    </td>
                    <td>{order.total}</td>
                    <td>{order.paymentType}</td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="confirm">Confirm</option>
                        <option value="shipping">Shipping</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancel">Canceled</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => handleViewClick(order)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </main>
      </div>
      <OrderDetailsModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        order={selectedOrder}
        productsCache={productsCache}
      />
    </div>
  );
};

export default ViewOrders;
