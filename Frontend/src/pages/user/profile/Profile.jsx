import React, { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { getUserData, updateUserData } from "../../../apis/Api";
// import "./Profile.css"; // Import the CSS file

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user._id;

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    console.log(id)
    const fetchUserData = async () => {
      try {
        const res = await getUserData(id);
        console.log(res.data.user);
        setFirstName(res.data.user.firstname);
        setLastName(res.data.user.lastname);
        setEmail(res.data.user.email);
        setPhone(res.data.user.phone);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!firstname || !lastname || !email || !phone) {
      toast.error("Please fill in all fields");
      return;
    }

    const formData = { firstname, lastname, email, phone };

    console.log("Updating profile with data:", formData); // Debug log

    try {
      const res = await updateUserData(id, formData);
      console.log("API response:", res); // Debug log

      if (res.status === 200) {
        toast.success("Profile updated successfully");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className='profile-container container'>
      <div className='profile-card row mt-3 shadow'>
        <div className='profile-left col-4 d-flex justify-content-center align-items-center flex-column'>
          <div className='mb-3'>
            <FaUserAlt size={100} />
          </div>
          <div className='profile-info w-100 text-center'>
            <h2>
              {firstname} {lastname}
            </h2>
            <p>{email}</p>
          </div>
        </div>
        <div className='profile-right col-8'>
          <h1>User Details</h1>
          <form className='profile-form' onSubmit={handleUpdate}>
            <div className='form-group-grid'>
              <div className='form-group pt-2'>
                <label htmlFor='firstname' className='form-label'>
                  First Name
                </label>
                <input
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                  type='text'
                  id='firstname'
                  name='firstname'
                  className='form-control'
                  placeholder='Enter your first name'
                />
              </div>
              <div className='form-group pt-2'>
                <label htmlFor='lastname' className='form-label'>
                  Last name
                </label>
                <input
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                  type='text'
                  id='lastname'
                  name='lastname'
                  className='form-control'
                  placeholder='Enter your lastname'
                />
              </div>
            </div>
            <div className='form-group pt-2'>
              <label htmlFor='email' className='form-label'>
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                id='email'
                className='form-control'
                name='email'
                placeholder='Enter your email'
              />
            </div>
            <div className='form-group pt-2'>
              <label htmlFor='phone' className='form-label'>
                Phone Number
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type='text'
                id='phone'
                className='form-control'
                name='phone'
                placeholder='Enter your phone number'
              />
            </div>
            <button
              type='submit'
              className='btn btn-success w-100 profile-btn my-3'
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;