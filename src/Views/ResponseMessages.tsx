
import React, { useState, useEffect, useContext } from 'react';
import AlertContext from '../Contexts/AlertContext';
import AuthContext from '../Contexts/AuthContext';
import { useCookies } from 'react-cookie';
import Table from '../Components/Table';
import { useNavigate } from 'react-router-dom';


const ResponseMessages: React.FC = () => {
  const [responses, setResponses] = useState<any[]>([]);
  const { setAlert, setWaiting } = useContext(AlertContext);
  const { loggedUser } = useContext(AuthContext);
  const [cookies] = useCookies(["login_token"]);
  const navigate = useNavigate();
  

  useEffect(() => {
    if (!loggedUser) {
      setAlert('Access denied. Users only.', 'error');
      return;
    }

    // Determine the endpoint based on the user's role
    const endpoint = loggedUser.role === 'admin'
      ? 'http://localhost:5000/api/responses/all'
      : 'http://localhost:5000/api/responses';

    // API call to fetch response messages
    const fetchResponses = async () => {
      setWaiting(true);
      try {
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies.login_token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch responses');
        }

        const data = await response.json();
        setResponses(data);
        setAlert('Responses fetched successfully!', 'success');
      } catch (error) {
        console.error('Error fetching responses:', error);
        setAlert('Failed to fetch responses.', 'error');
      } finally {
        setWaiting(false);
      }
    };

    fetchResponses();
  }, [cookies.login_token, ]);

  const columns = [
    { header: 'Response Text', key: 'responseText', filterable: true },
    { header: 'Ticket Title', key: 'ticketTitle', filterable: true },
    { header: 'Ticket Description', key: 'ticketDescription', filterable: true },
    { header: 'Date', key: 'createdAt', filterable: true },
    { header: 'Action', key: 'action', filterable: false },
  ];

 
  const formattedResponses = responses.map(response => ({
    _id: response._id, // Include the _id field
    responseText: response.responseText,
    ticketTitle: response.ticketId.title,
    ticketDescription: response.ticketId.description,
    createdAt: new Date(response.createdAt).toLocaleString(),
  }));

  const handleAction = (action: string, row: any) => {
    console.log(`Action: ${action}, Row:`, row);
    if (action === 'view') {
      navigate(`/responses/${row._id}`);
      console.log("view",row._id)
    }
    // Handle other actions (view, delete)
  };
  const allowedActions = {
    edit: false,
    view: true,
    delete: false,
  };
  return (
    <div className="mt-6">
      <h1 className="text-2xl font-bold mb-5">Response Messages</h1>
      <Table columns={columns} data={formattedResponses} onAction={handleAction} allowedActions={allowedActions} />
    </div>
  );
};

export default ResponseMessages;
