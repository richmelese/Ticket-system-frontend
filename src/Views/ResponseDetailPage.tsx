/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AlertContext from '../Contexts/AlertContext';
import AuthContext from '../Contexts/AuthContext';
import { useCookies } from 'react-cookie';

const ResponseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [responseDetail, setResponseDetail] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { setAlert } = useContext(AlertContext);
  const { loggedUser } = useContext(AuthContext);
  const [cookies] = useCookies(["login_token"]);
  const navigate = useNavigate();

  useEffect(() => {
    // if (!loggedUser) {
    //   setAlert('Access denied. Users only.', 'error');
    //   navigate('/login');
    //   return;
    // }

    if (!id) {
      setAlert('Invalid response ID.', 'error');
      navigate('/responses');
      return;
    }

    // API call to fetch response details
    const fetchResponseDetails = async () => {
      try {
        const response = await fetch(`http://49.13.66.115:5000/api/responses/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies.login_token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch response details');
        }

        const data = await response.json();
        setResponseDetail(data);
      } catch (error) {
        console.error('Error fetching response details:', error);
        setAlert('Failed to fetch response details.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchResponseDetails();
  }, [id, setAlert, loggedUser, cookies.login_token, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!responseDetail) {
    return <div>No response details found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold mb-6">Response Detail</h1>
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700">Response Text</label>
        <p className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-gray-100">{responseDetail.responseText}</p>
      </div>
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700">Ticket Title</label>
        <p className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-gray-100">{responseDetail.ticketId.title}</p>
      </div>
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700">Ticket Description</label>
        <p className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-gray-100">{responseDetail.ticketId.description}</p>
      </div>
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700">Date</label>
        <p className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-gray-100">{new Date(responseDetail.createdAt).toLocaleString()}</p>
      </div>
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700">Status</label>
        <p className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-gray-100">{responseDetail.status}</p>
      </div>
    </div>
  );
};

export default ResponseDetailPage;