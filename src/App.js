import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route,NavLink} from 'react-router-dom';
// import axios from 'axios';
import Login from '../src/components/login/login';
import Dashboard from '../src/components/login/dashboard';
import Home from '../src/components/login/home';
// import { getToken, removeUserSession } from '../src/utils/common';
import Warranty from './components/login/warranty';
import UserApproval from './components/login/userApproval';
import PendingWarranties from './components/login/pendingewarranties';
import Linesman from './components/linesman';

function App() {
  // const [authLoading, setAuthLoading] = useState(true);

  // useEffect(() => {
  //   const token = getToken();
  //   if (!token) {
  //     return;
  //   }

  //   axios.post(`https://mikaappliances.com/wp-json/jwt-auth/v1/token/validate`,
  //   {headers:{ 
  //     Authorization: `Bearer ${token}`}}).then(response => {
  //     // setUserSession(response.data.data.token, response.data.data);
  //     setAuthLoading(false);
  //   }).catch(error => {
  //     removeUserSession();
  //     setAuthLoading(false);
  //   });
  // }, []);

  // if (authLoading && getToken()) {
  //   return <div className="content">Checking Authentication...</div>
  // }

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="header">
            <NavLink activeClassName="active" to="/">Login</NavLink>
            <NavLink activeClassName="active" to="/registeredWarranties">Registered Warranties</NavLink>
            <NavLink activeClassName="active" to="/pendingWarranties">Pending Warranties</NavLink>
            <NavLink activeClassName="active" to="/userApproval">Linesmen Approval</NavLink>
          </div>
          <div className="content">
            <Routes>
              
              <Route path="/" element={<Login/>} />
              <Route path="/registeredWarranties" element={<Dashboard/>} />
              <Route path="/warranty" element={<Warranty/>} />
              <Route path="/userApproval" element={<UserApproval/>} />
              <Route path="/pendingWarranties" element={<PendingWarranties/>} />
              <Route path="/linesman" element={<Linesman/>} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;