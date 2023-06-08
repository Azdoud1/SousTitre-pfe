import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Navbar from "../Navbar/Navbar";
import "./update.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
    const user = localStorage.getItem("user");
    const [userData, setUserData] = useState({});
    const [newData, setNewData] = useState({});
    const [error, setError] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const url = `http://localhost:3000/users/${user}`;
                const { data } = await axios.get(url);
                setUserData(data.user);
                setNewData(data.user);
                console.log(data);
            } catch (error) {
                setError("Failed to fetch profile data");
            }
        };
        fetchProfileData();
    }, [user]);

    const handleChange = (e) => {
        setNewData({ ...newData, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (event) => {
        event.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }
        axios
            .put(`http://localhost:3000/users/${user}/password`, {
                currentPassword,
                newPassword,
                user,
            })
            .then(() => {
                setMessage("Password updated successfully");
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            })
            .catch((error) => {
                setMessage(error.response.data.message);
            });
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`http://localhost:3000/users/${user}`, newData);
            setUserData(data.user);
            setError("");
            console.log("Profile updated successfully");
            window.location.reload();
        } catch (error) {
            setError("Failed to update profile");
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <Navbar />
            <div className="container me-container">
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="row  monrow d-flex">
                    <h1 className="mt-5 mb-4 text-center ">Profile</h1>
                    <form className="col" onSubmit={handleProfileUpdate}>
                        <div className="form-group">
                            <label>First Name:</label>
                            <input
                                type="text"
                                name="firstName"
                                value={newData.firstName}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name:</label>
                            <input
                                type="text"
                                name="lastName"
                                value={newData.lastName}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={newData.email}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Update{" "}
                        </button>
                    </form>
                    <form className="col" onSubmit={handlePasswordChange}>
                        <div className="form-group">
                            <label>
                                Current Password:
                                {showPassword ? (
                                    <FiEyeOff onClick={toggleShowPassword} className="password-icon" />
                                ) : (
                                    <FiEye onClick={toggleShowPassword} className="password-icon" />
                                )}
                            </label>
                            <div className="password-input">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>
                                New Password:
                                {showPassword ? (
                                    <FiEyeOff onClick={toggleShowPassword} className="password-icon" />
                                ) : (
                                    <FiEye onClick={toggleShowPassword} className="password-icon" />
                                )}
                            </label>
                            <div className="password-input">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>
                                Confirm Password:
                                {showPassword ? (
                                    <FiEyeOff onClick={toggleShowPassword} className="password-icon" />
                                ) : (
                                    <FiEye onClick={toggleShowPassword} className="password-icon" />
                                )}
                            </label>
                            <div className="password-input">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Change Password
                        </button>
                    </form>
                </div>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default Profile;
