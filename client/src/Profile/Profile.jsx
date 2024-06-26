import React, { useContext , useState , useEffect } from 'react';
import { useUser } from '../UserContext';
import './Profile.css';
import { useNavigate } from "react-router-dom";
import { logout } from '../api/auth/logout';
import welcome from "../images/welcome.png";

export const Profile = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate('/login');
    } catch (error) {
      setError('Logout failed. Please try again.');
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <img src={welcome} alt="Profile Avatar" className="profile-avatar" />
        <h2>Welcome, {user.firstName} {user.lastName}</h2>
        <div className="profile-info">
          <p>Username:</p>
          <p>{user.username}</p>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};


