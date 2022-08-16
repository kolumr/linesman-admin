import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route,NavLink} from 'react-router-dom';
import axios from 'axios';

import Login from '../src/components/login/login';
import Dashboard from '../src/components/login/dashboard';
import Home from '../src/components/login/home';

import { getToken, removeUserSession, setUserSession } from '../src/utils/common';
import Warranty from './components/login/warranty';

function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios.post(`https://mikaappliances.com/wp-json/jwt-auth/v1/token/validate`,
    {headers:{ 
      Authorization: `Bearer ${token}`}}).then(response => {
      // setUserSession(response.data.data.token, response.data.data);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="header">
            <NavLink exact activeClassName="active" to="/">Home</NavLink>
            <NavLink activeClassName="active" to="/login">Login</NavLink>
            {/* <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink><small>(Access with token only)</small> */}
          </div>
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/dashboard" element={<Dashboard/>} />
              <Route path="/warranty" element={<Warranty/>} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;