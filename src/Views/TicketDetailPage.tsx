
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AlertContext from '../Contexts/AlertContext';
import AuthContext from '../Contexts/AuthContext';
import { useCookies } from 'react-cookie';

const TicketDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [responseText, setResponseText] = useState<string>('');
  const [status, setStatus] = useState<string>(''); 
  const [loading, setLoading] = useState<boolean>(true);
  const { setAlert } = useContext(AlertContext);
  const { loggedUser } = useContext(AuthContext);
  const [cookies] = useCookies(["login_token"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedUser || loggedUser.role !== 'admin') {
      setAlert('Access denied. Admins only.', 'error');
      navigate('/login');
      return;
    }

    if (!id) {
      setAlert('Invalid ticket ID.', 'error');
      navigate('/tickets');
      return;
    }

    // API call to fetch ticket details
    const fetchTicketDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/tickets/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies.login_token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch ticket details');
        }

        const data = await response.json();
        setTitle(data.title);
        setDescription(data.description);
        setResponseText(data.responseText);
        setStatus(data.status); // Set the status
      } catch (error) {
        console.error('Error fetching ticket details:', error);
        setAlert('Failed to fetch ticket details.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchTicketDetails();
  }, [id, setAlert, loggedUser, cookies.login_token, navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // API call to update ticket
    try {
      const response = await fetch(`http://localhost:5000/api/respond/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.login_token}`,
        },
        body: JSON.stringify({ responseText, status }), // Include status in the request body
      });

      if (!response.ok) {
        throw new Error('Failed to update ticket');
      }

      setAlert('Ticket updated successfully!', 'success');
      navigate('/tickets/created');
    } catch (error) {
      console.error('Error updating ticket:', error);
      setAlert('Failed to update ticket.', 'error');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-5">Give response</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            disabled
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            rows={4}
            required
            disabled
          />
        </div>
        <div className="mb-4">
          <label htmlFor="responseText" className="block text-sm font-medium text-gray-700">
            Response
          </label>
          <textarea
            id="responseText"
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            rows={4}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white font-medium text-sm rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Update Ticket
          </button>
        </div>
      </form>
    </div>
  );
};

export default TicketDetailPage;