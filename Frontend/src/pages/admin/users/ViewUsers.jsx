import React, { useEffect, useState } from 'react';
import { delUserById, getAllUserData } from '../../../apis/Api'; // Ensure delUserById is imported
import SideNav from '../SideNav';
// import AdminNav from '../../../components/AdminNav';

const ViewUsers = () => {
    const [users, setUsers] = useState([]); // Initialize as an empty array

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getAllUserData(); // Fetch user data
                console.log(response.data.data)
                setUsers(response.data.data || []); // Set users
            } catch (error) {
                // (error);
            } finally {
                // setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                console.log('Deleting user:', userId); // Debugging
                await delUserById(userId); // Call delete API
                // Remove the deleted user from state
                setUsers(users.filter(user => user._id !== userId));
            } catch (error) {
                // setError(error);
            }
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <SideNav />
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>firstname</th>
                                <th>last name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user._id}> {/* Replace user.id with a unique identifier */}
                                        <td>{user.firstname}</td>
                                        <td>{user.lastname}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(user._id)} // Call handleDelete on click
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No users found</td> {/* Adjust colspan to match the number of columns */}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </main>
            </div>
        </div>
    );
};

export default ViewUsers;