import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../../utils/common';
import { useNavigate } from "react-router-dom";
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
      navigate('/dashboard',{ replace: true });
    }).catch(error => {
      setLoading(false);
      // if (error.response.status === 401) setError(error.response.data.message);
      // else setError("Something went wrong. Please try again later.");
      console.log(error)
    });
  }
const testLogin= ()=>{
  console.log("hey" + username.value)
}
function sayHello() {
  alert('You clicked me!');
}
  return (
    <div>
      Login<br /><br />
      <div>
        Username<br />
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
      <button onClick={sayHello}>Default</button>
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