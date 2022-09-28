/* eslint-disable no-lone-blocks */
import React,{useEffect, useRef, useState} from 'react'
import axios from 'axios';
import { getToken } from '../../utils/common';
import Table from 'react-bootstrap/Table';
import {useNavigate} from'react-router-dom'
function UserApproval() {
  const [isLoading, setIsLoading] =useState(false); 
  const [linesmen,setLinesmen] = useState([]);
  const [newLinesmen,setNewLinesmen] = useState([]);
  const token = useRef(null);
  const response_ = useRef();
  let navigate = useNavigate();
  var includeString =''
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
  const fetchLinesmanapprove = () => {
    console.log("Starting...")
  console.log(includeString)
      axios({
        url:`https://mikaappliances.com/wp-json/wp/v2/users?include=${includeString}`,
        headers: {authorization:token.current},
        method:'get',
        })
      .then((response) => {
      
        setLinesmen(response.data);    
        setIsLoading(false)
       
        console.log(linesmen)
      }
      )
      .catch(function (error) {
        console.log(error);
      })
      
    
  }
  const getLinesmanApprove = (id) =>{
    let arr = response_.current.filter((e)=>{if(e.id === id) return e})
  }
useEffect(()=>{
  setIsLoading(true)
  async function fetchdata(){
  const tokens = await getToken();
  token.current = `Bearer ${tokens}`
console.log(token.current)
  axios({
    url:`https://mikaappliances.com/wp-json/wc/v3/customers?role=linesman&per_page=100`,
    headers:{authorization:token.current},
    method:'get',})
    .then(response=>{
    console.log(response.data)
    setNewLinesmen(response.data)
    includeString =''
      response.data.map((linesman)=>{
        includeString+=`${linesman.id}` +","
        console.log(includeString)
       }) 
  }).catch(error =>{
    setIsLoading(false);
    console.log(error)
  });
  
}
fetchdata();
setTimeout(() => {
  fetchLinesmanapprove();
}, 5000);
},[])
function display (linesmanapprove) {
  if(linesmanapprove = false){return "approve"}
  else if(linesmanapprove = true) {return "approved"}
  else{return "Null"}}

    { if (isLoading) {return <div>Loading...</div>}
      else{ return (
    <div>Linesmen Approval<br/><br/>
      <Table responsive striped bordered hover>
        <thead>
        <tr>
          <th>Linesman Id</th>
          <th>Linesman Name</th>
          <th>Phone Number</th>
          <th>Store</th>
          <th>Email</th>
          <th>Registration Date</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
          {
          // eslint-disable-next-line array-callback-return
          linesmen.map((linesman) =>{
             count=count + 1;
            //  console.log('hey'+linesman.acf)
             if(linesman.acf.linesmanapprove === null || linesman.acf.linesmanapprove === true)
            return(
              <tr key={linesman.id} onClick = {() => {navigate('/linesman', {state:[linesman,token.current]})} }>
                <td>{linesman.acf.national_id}</td>
                {/* <td>{dummydata[count][1]}</td> */}
                <td>{linesman.name}</td>
                <td>{linesman.acf.phone_number}</td>
                <td>{linesman.acf.store}</td>
                <td>{linesman.acf.email}</td>
                <td>{linesman.date_created}</td>
                {isLoading? <td></td> :
                <td style={{"color":"green"}}>{display()}</td>}
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
   ) } }
  
}

export default UserApproval