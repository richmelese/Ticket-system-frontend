import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertContext from '../Contexts/AlertContext';
import AuthContext from '../Contexts/AuthContext';

const AccessDeniedPage: React.FC = () => {
  const { setAlert } = useContext(AlertContext);
  const { loggedUser } = useContext(AuthContext);
  const navigate = useNavigate();

  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">Access Denied</h1>
        <p className="text-gray-700">You do not have permission to view this page. Please log in as an admin.</p>
      </div>
    </div>
  );
};

export default AccessDeniedPage;