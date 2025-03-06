
import { useState, useContext, useEffect } from 'react';
import Table from '../Components/Table';
import AlertContext from '../Contexts/AlertContext';
import AuthContext from "../Contexts/AuthContext";
import { useNavigate } from 'react-router-dom';

const UserListPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const { setAlert, setWaiting } = useContext(AlertContext);
  const { loggedUser, cookies } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedUser || loggedUser.role !== 'admin') {
      setAlert('Access denied. Admins only.', 'error');
      navigate('/access-denied');
      return;
    }

    // API call to fetch users
    const fetchUsers = async () => {
      setWaiting(true);
      try {
        const response = await fetch('http://localhost:5000/api/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies.login_token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data);
        setAlert('Users fetched successfully!', 'success');
      } catch (error) {
        console.error('Error fetching users:', error);
        setAlert('Failed to fetch users.', 'error');
      } finally {
        setWaiting(false);
      }
    };

    fetchUsers();
  }, [ cookies.login_token]);

  const columns = [
    { header: 'Name', key: 'name', filterable: true },
    { header: 'Email', key: 'email', filterable: true },
    { header: 'Role', key: 'role', filterable: true },
    // { header: 'Action', key: 'action', filterable: false },
  ];

  const handleAction = (action: string, row: any) => {
    console.log(`Action: ${action}, Row:`, row);
    // Handle actions (edit, view, delete)
  };

  const allowedActions = {
    edit: false,
    view: false,
    delete: false,
  };

  return (
    <div className="p-6rounded-lg">
      <h1 className="text-2xl font-bold mb-5">Users</h1>
      <Table columns={columns} data={users} onAction={handleAction} allowedActions={allowedActions} />
    </div>
  );
};

export default UserListPage;