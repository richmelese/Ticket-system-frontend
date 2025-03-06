/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import AlertContext from "./Contexts/AlertContext";
import AuthContext from "./Contexts/AuthContext";
import Alert from "./Components/Extra/Alert";
import Waiting from "./Components/Extra/Waiting";
import MainScreen from "./Views/MainScreen";
import Dashboard from "./Views/Dashboard";
import TicketPage from "./Views/TicketPage";
import TicketListPage from "./Views/TicketListPage";
import TicketDetailPage from "./Views/TicketDetailPage";
import UserRegistrationPage from "./Views/UserRegistrationPage";
import LoginPage from "./Views/LoginPage";
import User from "./Views/User";
import AccessDeniedPage from './Views/AccessDeniedPage';
import AccessDeniedAdmin from './Views/AccessDeniedAdmin';
import ResponseMessages from './Views/ResponseMessages';
import ResponseDetailPage from './Views/ResponseDetailPage';




function App() {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [loggedUser, setLoggedUser] = useState<any>(null);
  const [cookies, setCookie, removeCookie] = useCookies(["login_token"]);
  const [authWaiting, setAuthWaiting] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showWaiting, setWaiting] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<"success" | "error" | "warning" | "info">("info");
  const [alertMessage, setMessage] = useState<string>("");
  const [menu, setMenu] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async (token: string) => {
      setAuthWaiting(true);
      setWaiting(true);
      const response = window.localStorage.getItem("loggedUser");
      setLoggedIn(response ? true : false);
      setLoggedUser(response ? JSON.parse(response) : null);
      setAuthWaiting(false);
      setWaiting(false);
    };

    if (cookies.login_token && cookies.login_token !== "") {
      checkAuth(cookies.login_token);
    }
  }, [cookies.login_token]);

  const setAlert = (
    message: string,
    type: "success" | "error" | "warning" | "info"
  ) => {
    setAlertType(type);
    setShowAlert(true);
    setMessage(message);

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const onLogin = (signinUser: any) => {
    window.localStorage.setItem("loggedUser", JSON.stringify(signinUser));
    setLoggedUser(signinUser);
    setLoggedIn(true);
  };

  return (
    <AlertContext.Provider value={{ showAlert, alertType, setAlertType, setAlert, setWaiting, showWaiting, menu, setMenu }}>
      <AuthContext.Provider value={{ isLoggedIn, loggedUser, setLoggedUser, setLoggedIn, setCookie, cookies, removeCookie, authWaiting, onLogin }}>
        <BrowserRouter>
          {!authWaiting ? (
            isLoggedIn ? (
              <Routes>
                <Route path="/" element={<MainScreen />}>
                  <Route path="" element={<Dashboard />} />
                  <Route path="tickets" element={<TicketPage />} />
                  <Route path="tickets/created" element={<TicketListPage />} />
                  <Route path="tickets/:id" element={<TicketDetailPage />} />
                  <Route path="users" element={<User/>} />
                  <Route path="/access-denied" element={<AccessDeniedPage />} />
                  <Route path="/AccessDeniedAdmin" element={<AccessDeniedAdmin />} />
                  <Route path="/Response" element={<ResponseMessages />}/>
                  <Route path="responses/:id" element={<ResponseDetailPage />} />

                </Route>
              </Routes>
            ) : (
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="users/register" element={<UserRegistrationPage />} />
                


                <Route path="*" element={<LoginPage />} />
              </Routes>
            )
          ) : null}
          {showAlert && <Alert message={alertMessage} color={alertType} />}
          {authWaiting && <Waiting />}
        </BrowserRouter>
      </AuthContext.Provider>
    </AlertContext.Provider>
  );
}

export default App;