
import { useContext, useState } from 'react';
import { Button, TextField, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, MailOutline } from '@mui/icons-material';
import AlertContext from "../Contexts/AlertContext";
import AuthContext from "../Contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/download (1).png';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const { setAlert, setWaiting } = useContext(AlertContext);
  const { setLoggedUser, setLoggedIn, setCookie } = useContext(AuthContext);

  const [fields, setFields] = useState<{ email: string; password: string }>({
    email: "",  
    password: "",
  });

  const navigate = useNavigate();

  const fieldSetter = (type: "email" | "password", value: string) => {  
    setFields({ ...fields, [type]: value });
  };

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();

    setWaiting(true);
    try {
      const response = await fetch('http://49.13.66.115:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: fields.email, password: fields.password }),
      });

      if (!response.ok) {
        throw new Error('Failed to log in');
      }

      const data = await response.json();
      setLoggedUser(data);
      setLoggedIn(true);
      setCookie("login_token", data.token, { path: "/", maxAge: 86400 });
      window.localStorage.setItem("loggedUser", JSON.stringify(data));
      setLoggedIn(true);  
      navigate("/");

      setWaiting(false);
    } catch (error: any) {
      setWaiting(false);
      setAlert(error.message, "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center w-full max-w-[550px] max-h-[700px] bg-white px-6 py-8 rounded-lg shadow-md">
        <div className="flex flex-col items-center mb-6">
          <img
            src={logo}
            alt="Logo"
            className="w-20 h-20 mb-2"
          />
        </div>

        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-purple-500 text-transparent bg-clip-text mb-6">
          Welcome Back
        </h1>
        <form className="w-full mt-5  px-7" onSubmit={submitForm}>
          <div className="w-full">
            <TextField
              label="Enter Email Address or Phone"
              variant="outlined"
              fullWidth
              value={fields.email}  
              onChange={(e) => fieldSetter("email", e.target.value)}  
              InputProps={{
                endAdornment: (
                  <IconButton edge="end">
                    <MailOutline />
                  </IconButton>
                ),
              }}
              className="mb-4 "
            />
          </div>

          <div className="w-full mt-4">
            <TextField
              label="Password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={fields.password}
              onChange={(e) => fieldSetter("password", e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton edge="end" onClick={togglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
              className="mb-4"
            />
          </div>

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
              Sign in
            </Button>
          </div>
        </form>
        <div className="w-full mt-4">
          <Button
            variant="outlined"
            fullWidth
            style={{
              borderColor: '#9333EA',
              color: '#9333EA',
              height: '50px',
            }}
            className="shadow-lg py-2"
            onClick={() => navigate('/users/register')}
          >
            Don't have an account? Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;