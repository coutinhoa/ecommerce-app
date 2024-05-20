import React, { useContext } from 'react';
import { useUser } from '../UserContext';
import './Profile.css';

export const Profile = () => {
  const { setUser } = useUser();

  if (!setUser) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <img src="https://via.placeholder.com/100" alt="Profile Avatar" className="profile-avatar" />
        <h2>Welcome, {setUser.firstName} {setUser.lastName}</h2>
        <div className="profile-info">
          <p>Username:</p>
          <p>{setUser.username}</p>
        </div>
        <div className="profile-info">
          <p>Email:</p>
          <p>{setUser.email}</p>
        </div>
      </div>
    </div>
  );
};


