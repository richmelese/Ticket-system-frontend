
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertContext from '../Contexts/AlertContext';
import AuthContext from '../Contexts/AuthContext';
import { useCookies } from 'react-cookie';
import Table from '../Components/Table';

const TicketPage: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [tickets, setTickets] = useState<any[]>([]);
  const { setAlert, setWaiting } = useContext(AlertContext);
  const { loggedUser } = useContext(AuthContext);
  const [cookies] = useCookies(["login_token"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedUser || loggedUser.role !== 'user') {
      setAlert('Access denied. Users only.', 'error');
      navigate('/AccessDeniedAdmin');
      return;
    }

    // API call to fetch tickets by userId
    const fetchTickets = async () => {
      setWaiting(true);
      try {
        const response = await fetch(`http://49.13.66.115:5000/api/tickets/user/${loggedUser.userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies.login_token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch tickets');
        }

        const data = await response.json();
        setTickets(data);
        setAlert('Tickets fetched successfully!', 'success');
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setAlert('Failed to fetch tickets.', 'error');
      } finally {
        setWaiting(false);
      }
    };

    fetchTickets();
  }, [ cookies.login_token]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setWaiting(true);
    try {
      const response = await fetch('http://49.13.66.115:5000/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.login_token}`,
        },
        body: JSON.stringify({ title, description, userId: loggedUser.userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to create ticket');
      }
      console.log('userId:', loggedUser.userId)
      console.log('title:', title)
      console.log('description:', description)
      setTitle('');
      setDescription(' ');
      setAlert('Ticket created successfully!', 'success');
      navigate('/tickets');
    } catch (error) {
      console.error('Error creating ticket:', error);
      setAlert('Failed to create ticket.', 'error');
    } finally {
      setWaiting(false);
    }
  };

  const columns = [
    { header: 'Title', key: 'title', filterable: true },
    { header: 'Description', key: 'description', filterable: true },
    { header: 'Status', key: 'status', filterable: true },
    { header: 'Action', key: 'action', filterable: false },
  ];

  const handleAction = (action: string, row: any) => {
    console.log(`Action: ${action}, Row:`, row);
    // Handle actions (edit, view, delete)
  };

  const allowedActions = {
    edit: false,
    view: true,
    delete: false,
  };

  return (
    <div>
    <div className="max-w-4xl  p-6 bg-white shadow-md rounded-md align-left">
      <h1 className="text-2xl font-bold mb-5">Create Ticket</h1>
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
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white font-medium text-sm rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Create Ticket
          </button>
        </div>
      </form>
    </div>
     <div className="mt-6 ">
     <h1 className="text-2xl font-bold mb-5">Tickets</h1>
     <Table columns={columns} data={tickets} onAction={handleAction} allowedActions={allowedActions} />
 </div>
    </div>
  );
};

export default TicketPage;

