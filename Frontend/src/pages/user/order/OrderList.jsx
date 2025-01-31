import { Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { getUserOrdersApi } from '../../../apis/Api'; // Ensure this API exists

const PageContainer = styled.div`
  background-color: #f0f2f5;
  min-height: 100vh;
  padding: 2rem;
`;

const OrderListContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Header = styled.h2`
  color: #1a237e;
  font-size: 2rem;
  margin: 0;
`;

const FilterSelect = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const OrderCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  padding: 1.5rem;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const OrderId = styled.h3`
  color: #1a237e;
  font-size: 1.2rem;
  margin: 0;
`;

const Status = styled.span`
  background-color: ${(props) => {
        switch (props.status) {
            case 'dispatched':
                return '#4caf50';
            case 'pending':
                return '#ff9800';
            case 'cancelled':
                return '#f44336';
            default:
                return '#2196f3';
        }
    }};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
`;

const OrderInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const InfoItem = styled.p`
  margin: 0;
  color: #424242;
`;

const ItemsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const Item = styled.li`
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 1rem;
  border-radius: 4px;
`;

const AddressDetails = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 4px;
`;

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [addressDetails, setAddressDetails] = useState({});

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getUserOrdersApi();
                console.log('Fetched Orders:', data);
                setOrders(data.data.orders);
                setFilteredOrders(data.data.orders); // Initialize filteredOrders
            } catch (err) {
                console.error('Error fetching orders:', err);
                toast.error('Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    useEffect(() => {
        // Filter orders based on selected status
        if (selectedStatus === 'all') {
            setFilteredOrders(orders);
        } else {
            setFilteredOrders(orders.filter(order => order.status === selectedStatus));
        }
    }, [selectedStatus, orders]);

    // const fetchAddressDetails = async (addressId) => {
    //     setAddressDetails((prevDetails) => ({
    //         ...prevDetails,
    //         [addressId]: { loading: true, data: null }
    //     }));

    //     try {
    //         const response = await getShippingAddressById(addressId);
    //         setAddressDetails((prevDetails) => ({
    //             ...prevDetails,
    //             [addressId]: { loading: false, data: response.data.address }
    //         }));
    //     } catch (error) {
    //         console.error('Error fetching shipping address:', error);
    //         toast.error('Failed to fetch shipping address');
    //         setAddressDetails((prevDetails) => ({
    //             ...prevDetails,
    //             [addressId]: { loading: false, data: null }
    //         }));
    //     }
    // };

    // useEffect(() => {
    //     // Fetch address details for each order if not already fetched
    //     filteredOrders.forEach(order => {
    //         if (order.address && !addressDetails[order.address]) {
    //             fetchAddressDetails(order.address);
    //         }
    //     });
    // }, [filteredOrders, addressDetails]);

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    if (loading) {
        return (
            <PageContainer>
                <OrderListContainer>
                    <HeaderContainer>
                        <Header>Your Orders</Header>
                        <FilterSelect value={selectedStatus} onChange={handleStatusChange}>
                            <option value="all">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="confirm">Confirm</option>
                            <option value="shipping">Shipping</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancel">Canceled</option>
                        </FilterSelect>
                    </HeaderContainer>
                    {[...Array(3)].map((_, index) => (
                        <Skeleton key={index} active avatar paragraph={{ rows: 4 }} />
                    ))}
                </OrderListContainer>
            </PageContainer>
        );
    }

    if (!filteredOrders.length) {
        return (
            <PageContainer>
                <OrderListContainer>
                    <HeaderContainer>
                        <Header>Your Orders</Header>
                        <FilterSelect value={selectedStatus} onChange={handleStatusChange}>
                            <option value="all">All Statuses</option>
                            <option value="Pending">Pending</option>
                            <option value="Confirm">Confirm</option>
                            <option value="Shipping">Shipping</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancel">Canceled</option>
                        </FilterSelect>
                    </HeaderContainer>
                    <p>No orders found.</p>
                </OrderListContainer>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <OrderListContainer>
                <HeaderContainer>
                    <Header>Your Orders</Header>
                    <FilterSelect value={selectedStatus} onChange={handleStatusChange}>
                        <option value="all">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="confirm">Confirm</option>
                        <option value="shipping">Shipping</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancel">Canceled</option>
                    </FilterSelect>
                </HeaderContainer>
                {filteredOrders.map((order) => (
                    <OrderCard key={order._id}>
                        <OrderHeader>
                            <OrderId>Order ID: {order._id}</OrderId>
                            <Status status={order.status}>{order.status}</Status>
                        </OrderHeader>
                        <OrderInfo>
                            <InfoItem>
                                <strong>Total:</strong> Rs. {order.total}
                            </InfoItem>
                            <InfoItem>
                                <strong>Payment:</strong> {order.paymentType}
                            </InfoItem>
                            <InfoItem>
                                <strong>Address:</strong>
                                {order.address}
                            </InfoItem>
                            <InfoItem>
                                <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
                            </InfoItem>
                        </OrderInfo>
                        <h4>Items:({order.carts.length})</h4>
                        <ItemsList>
                            {order.carts.map((item) => (
                                <Item key={item._id}>
                                    <ProductImage src={`http://localhost:5500/products/${item.productID.productImage}`} alt={item.productID.productName} />
                                    <div>
                                        <p>
                                            <strong>{item.productID.productName}</strong>
                                        </p>
                                        <p>
                                            Price: Rs. {item.productPrice} | Quantity: {item.quantity}
                                        </p>
                                    </div>
                                </Item>
                            ))}
                        </ItemsList>
                    </OrderCard>
                ))}
            </OrderListContainer>
        </PageContainer>
    );
};

export default OrderList;
