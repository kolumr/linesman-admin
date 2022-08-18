import React,{useEffect, useRef, useState} from 'react'
import axios from 'axios';
import { getToken } from '../../utils/common';
import Table from 'react-bootstrap/Table';
function UserApproval() {
  const [isLoading, setIsLoading] =useState(false); 
  const [linesmen,setLinesmen] = useState([]);
  var count = 0;
  const dummydata = [
    [333239374, 254732974508],
    [234236350, 254722876509],
    [333239306, 254722574588],
    [13339300, 254732964504],
    [232349375, 254702974921],
    [333249370, 25473305459],
    [300059355, 254712434902],
    [333239372, 254734964587],
    [345239386, 254702674569],
    [245239379, 254720940007],
    [14573970, 254732204064],
  ]
useEffect(()=>{
  const token = getToken();
    setIsLoading(true);
  axios({
    url:`https://mikaappliances.com/wp-json/wc/v3/customers?role=linesman`,
    headers:{authorization:`Bearer ${token}`},
    method:'get',})
    .then(response=>{
    console.log(response.data)
    setLinesmen(response.data)
    setIsLoading(false)
  }).catch(error =>{
    setIsLoading(false);
    console.log(error)
  });
},[])

  return (
    
    <div>Linesmen Approval<br/><br/>
      <Table responsive striped bordered hover>
        <thead>
        <tr>
          <th>Linesman Id</th>
          <th>Phone Number</th>
          <th>Username</th>
          <th>Email</th>
          <th>Registration date</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
          {
          linesmen.map((linesman) =>{
             count=count + 1;
            return(
              <tr>
                <td>{dummydata[count][0]}</td>
                <td>{dummydata[count][1]}</td>
                <td>{linesman.username}</td>
                <td>{linesman.email}</td>
                <td>{linesman.date_created}</td>
                <td style={{"color":"green"}}>Approve</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
    
  )
}

export default UserApproval