import React, { useEffect, useState } from 'react';
import { getToken, getUser, removeUserSession } from '../../utils/common';
import {useNavigate} from'react-router-dom'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { dataLookUp } from '../../utils/data';

function PendingWarranties() {
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
    const token =`Bearer ${tokens}`
    console.log(token)
    if(tokens === null)navigate('/login',{replace:true});
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
      {isLoading? <div>Loading.....</div>: 
            <Table responsive striped bordered hover>
            <thead>
            <tr>
              <th>Warranty Id</th>
              <th>Customer Name</th>
              <th>Customer Mobile Number</th>
              <th>Linesman</th>
              <th>Store</th>
              <th>Product Name</th>
              <th>Model no</th>
              <th>Purchase Date</th>
              <th>Registration Date</th>
              <th>Warranty Period</th>
            </tr>
            </thead>
            <tbody>
              {warranties.map((warranty) =>{
                return(
                  <tr onClick={() => navigate('/warranty',{state:warranty})}>
                    <td>{warranty.WarrantyID}</td>
                    <td>{warranty.CustomerName}</td>
                    <td>{warranty.MobileNo}</td>
                    <td>{warranty.Store}</td>
                    <td>{warranty.Linesman}</td>
                    {dataLookUp.map((data) => {
                      if(warranty.ModelNo === data.ModelNo){
                        return <td>{data.ItemName}</td>
                      }
                    })}
                    <td>{warranty.ModelNo}</td>
                    <td>{warranty.DateOfPurchase}</td>
                    <td>{warranty.DateOfRegistration}</td>
                    <td>{warranty.WarrantyPeriod}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>}
    </div>
    
  );
}

export default PendingWarranties;