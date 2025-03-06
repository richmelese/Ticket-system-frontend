/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertContext from '../Contexts/AlertContext';
import { useContext } from 'react';
import { Button, TextField, IconButton } from '@mui/material';
import { MailOutline, LockOutlined, PhoneOutlined } from '@mui/icons-material';

const UserRegistrationPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('user');
  const [phoneNumber, setPhoneNumber] = useState<string>(''); 
  const { setAlert } = useContext(AlertContext);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // API call to register user
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phoneNumber, password, role }),
      });

      if (!response.ok) {
        throw new Error('Failed to register user');
      }

      setAlert('User registered successfully!', 'success');
      navigate('/users');
    } catch (error) {
      console.error('Error registering user:', error);
      setAlert('Failed to register user.', 'error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center w-full max-w-[550px] max-h-[700px] bg-white px-6 py-8 rounded-lg shadow-md mt-10">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-purple-500 text-transparent bg-clip-text mb-6">
          Register User
        </h1>
        <form className="w-full mt-5 px-7" onSubmit={handleSubmit}>
          <div className="w-full mb-4">
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-4"
            />
          </div>
          <div className="w-full mb-4">
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton edge="end">
                    <MailOutline />
                  </IconButton>
                ),
              }}
              className="mb-4"
            />
          </div>
          <div className="w-full mb-4">
            <TextField
              label="Phone Number" 
              variant="outlined"
              fullWidth
              value={ phoneNumber} 
              onChange={(e) => setPhoneNumber(e.target.value)} 
              InputProps={{
                endAdornment: (
                  <IconButton edge="end">
                    <PhoneOutlined />
                  </IconButton>
                ),
              }}
              className="mb-4"
            />
          </div>
          <div className="w-full mb-4">
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton edge="end">
                    <LockOutlined />
                  </IconButton>
                ),
              }}
              className="mb-4"
            />
          </div>
          {/* <div className="w-full mb-4">
            <TextField
              label="Role"
              variant="outlined"
              fullWidth
              value={role}
              onChange={(e) => setRole(e.target.value)}
              select
              SelectProps={{
                native: true,
              }}
              className="mb-4"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </TextField>
          </div> */}
          <div className="w-full mb-16 mt-5">
            <Button
              variant="contained"
              fullWidth
              style={{
                background: 'linear-gradient(to right, #9333EA, #F59E0B)',
                color: '#fff',
                marginTop: '20px',
                height: '50px',
              }}
              className="shadow-lg py-2 mb-6"
              type="submit"
            >
              Register User
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegistrationPage;