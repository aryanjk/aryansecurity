// import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import {
  createAddress,
  deleteAddress,
  editAddress,
  getAddress,
} from "../../apis/Api.js";

const AddressForm = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({
    userId: user ? user._id : "",
    phoneNumber: "",
    city: "",
    address: "",
    landmark: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      console.log(user);
      console.log(user._id);
      if (user && user._id) {
        try {
          const response = await getAddress(user._id);
          if (response.data && Array.isArray(response.data.addresses)) {
            setAddresses(response.data.addresses);
          } else {
            toast.error("No addresses found");
          }
        } catch (error) {
          console.error("Error fetching addresses:", error);
          // toast.error('Failed to fetch addresses');
        }
      } else {
        toast.error("User not found");
      }
    };
    fetchAddresses();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      // Remove any non-digit characters
      const cleanedValue = value.replace(/\D/g, "");
      // Ensure the value has exactly 10 digits
      if (cleanedValue.length <= 10) {
        setForm({ ...form, [name]: cleanedValue });
      }
    } else {
      setForm({ ...form, [name]: value });
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAddressId) {
        // Edit existing address
        const response = await editAddress(editingAddressId, form);
        if (response.data.success) {
          toast.success(response.data.message);
          setAddresses(
            addresses.map((addr) =>
              addr._id === editingAddressId ? response.data.address : addr
            )
          );
        } else {
          toast.error(response.data.message);
        }
      } else {
        // Create new address
        const response = await createAddress(form);
        if (response.data.message === "Shipping address created successfully") {
          toast.success(response.data.message);
          setAddresses([...addresses, response.data.message]);
        } else {
          toast.error(response.data.message);
        }
      }
      setForm({
        userId: user ? user._id : "",
        phoneNumber: "",
        city: "",
        address: "",
        landmark: "",
      });
      setEditingAddressId(null);
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to save address. Please try again.");
    }
  };

  const handleDelete = async (addressId) => {
    const confirmDialog = window.confirm(
      "Are you sure you want to delete this address?"
    );
    if (confirmDialog) {
      try {
        const response = await deleteAddress(addressId);
        if (response.data.success) {
          toast.success(response.data.message);
          setAddresses(
            addresses.filter((address) => address._id !== addressId)
          );
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Failed to delete address. Please try again.");
      }
    }
  };

  const handleUpdate = (address) => {
    setForm({
      userId: address.userId,
      phoneNumber: address.phoneNumber,
      city: address.city,
      address: address.address,
      landmark: address.landmark,
    });
    setEditingAddressId(address._id);
    console.log("Editing address:", address);
    setIsModalOpen(true);
  };

  return (
    <div className='row'>
      <div className='d-flex container justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
        <h1 className='h2'>My Addresses</h1>
      </div>

      <Modal show={isModalOpen} onHide={() => setIsModalOpen(true)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingAddressId ? "Edit Address" : "Add a New Address"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formPhoneNumber' className='mb-3'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type='number'
                name='phoneNumber'
                placeholder='Enter phone number'
                value={form.phoneNumber}
                onChange={handleChange}
                required
                pattern='\d{10}'
                maxLength={10}
              />
            </Form.Group>

            <Form.Group controlId='formCity' className='mb-3'>
              <Form.Label>City</Form.Label>
              <Form.Control
                type='text'
                name='city'
                placeholder='Enter city'
                value={form.city}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId='formAddress' className='mb-3'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='text'
                name='address'
                placeholder='Enter full address'
                value={form.address}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId='formLandmark' className='mb-3'>
              <Form.Label>Landmark</Form.Label>
              <Form.Control
                type='text'
                name='landmark'
                placeholder='Enter landmark'
                value={form.landmark}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              {editingAddressId ? "Update Address" : "Save Address"}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setIsModalOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className='container'>
        {addresses.length > 0 ? (
          addresses.map((address) => (

            <div className='row my-2 shadow p-2'>
              <div className='col-10  pt-2'>
                <p className='p-0 m-0'>
                  {address.phoneNumber}, {address.landmark}
                </p>
                <p className='p-0 m-0 mt-2'>
                  {address.address}, {address.city}
                </p>
              </div>

              <div className='d-flex flex-column justify-content-end gap-2 col-2'>
                <Button
                  variant='danger'
                  className='btn btn-sm py-1 px-2'
                  onClick={() => handleDelete(address._id)}
                >
                  Delete
                </Button>
                <Button
                  variant='primary'
                  className='btn-sm'
                  onClick={() => handleUpdate(address)}
                >
                  Edit
                </Button>{" "}
              </div>
            </div>
          ))
        ) : (
          <tr>
            <td colSpan='4'>No addresses available</td>
          </tr>
        )}

        <div className=' w-100 mt-3 text-end'>
          <Button variant='danger' onClick={() => setIsModalOpen(true)}>
            Add Address
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;