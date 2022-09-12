import React, { useEffect, useState } from 'react';
import { getToken, getUser, removeUserSession } from '../../utils/common';
import {useNavigate} from'react-router-dom'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { Button } from 'bootstrap';

function Dashboard() {
  const user = getUser();
  let navigate = useNavigate();
  const [isLoading, setIsLoading] =useState(false); 
  const [warranties, setWarranties] = useState([]);
  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    navigate('/login',{replace:true});
  }
  useEffect(() =>{
    async function fetchdata(){
    const tokens = await getToken();
    const token = `Bearer ${tokens}`
    console.log(token)
    if(token === null)navigate('/login',{replace:true});
      setIsLoading(true);
      axios({url:'https://mikaappliances.com/wp-json/get/allwarrantyreg',
      headers:{authorization:token},
      method: 'get'})
      .then(response=>{
        setWarranties(response.data.data)
        console.log(response.data.data)
        setIsLoading(false)
      }).catch(error =>{
        setIsLoading(false);
        console.log(error)
      });
    }
    fetchdata();
  },[])
  return (
    <div>
      Welcome!<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" />
      {isLoading? <div>Loading.....</div>: 
      <Table responsive striped bordered hover>
        <thead>
        <tr>
          <th>Warranty Id</th>
          <th>Model no</th>
          <th>Customer Mobile Number</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
          {warranties.map((warranty) =>{
            return(
              <tr onClick={() => navigate('/warranty',{state:warranty})}>
                <td>{warranty.WarrantyID}</td>
                <td>{warranty.ModelNo}</td>
                <td>{warranty.MobileNo}</td>
                <td style={{"color":"red"}}>Approved</td>
                <td style={{"color":"green"}}>View</td>
              </tr>
            )
          })}
        </tbody>
      </Table>}
    </div>
    
  );
}

export default Dashboard;