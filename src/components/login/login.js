import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../../utils/common';
import { useNavigate } from "react-router-dom";
import logo from './MIKA-LOGO.png'
function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  let navigate = useNavigate();
  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios({url:'https://mikaappliances.com/wp-json/jwt-auth/v1/token', 
    data:{ username: username.value, password: password.value },
    method:'post'})
    .then(response => {
      setLoading(false);
      setUserSession(response.data.data.token, response.data.data);
      navigate('/registeredWarranties',{ replace: true });
    }).catch(error => {
      setLoading(false);
      // if (error.response.status === 401) setError(error.response.data.message);
      // else setError("Something went wrong. Please try again later.");
      console.log(error)
    });
  }
  return (
      <div className="Auth-form-container">
          
      <form className="Auth-form">
      
        <div className="Auth-form-content">
        <img className='logo-image' src={logo}/>
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text" {...username} 
              autoComplete="new-password"
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password" {...password} 
              autoComplete="new-password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading}>
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;