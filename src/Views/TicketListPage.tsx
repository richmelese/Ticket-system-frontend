/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useContext } from 'react';
import Table from '../Components/Table';
import AlertContext from '../Contexts/AlertContext';
import AuthContext from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const TicketListPage: React.FC = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const { setAlert, setWaiting } = useContext(AlertContext);
  const { loggedUser } = useContext(AuthContext);
  const [cookies] = useCookies(["login_token"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedUser || loggedUser.role !== 'admin') {
      setAlert('Access denied. Admins only.', 'error');
      navigate('/access-denied');
      return;
    }

    // API call to fetch tickets
    const fetchTickets = async () => {
      setWaiting(true);
      try {
        const response = await fetch('http://localhost:5000/api/tickets', {
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

  const columns = [
    { header: 'Title', key: 'title', filterable: true },
    { header: 'Description', key: 'description', filterable: true },
    { header: 'Status', key: 'status', filterable: true },
    { header: 'Action', key: 'action', filterable: false },
  ];

  const handleAction = (action: string, row: any) => {
    console.log(`Action: ${action}, Row:`, row);
    if (action === 'edit') {
      navigate(`/tickets/${row._id}`);
    }
    // Handle other actions (view, delete)
  };

  const allowedActions = {
    edit: true,
    view: false,
    delete: false,
  };

  return (
    <div className="p-6  rounded-lg">
      <h1 className="text-2xl font-bold mb-5">Tickets</h1>
      <Table columns={columns} data={tickets} onAction={handleAction} allowedActions={allowedActions} />
    </div>
  );
};

export default TicketListPage;