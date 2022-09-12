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
  const response_ = useRef([]);
  let navigate = useNavigate();
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
    response_.current=[];
   linesmen.map((linesman)=>{
      axios({
        url:`https://mikaappliances.com/wp-json/acf/v3/users/${linesman.id}`,
        headers: {authorization:token.current},
        method:'get',
        })
      .then((response) => {
        console.log(response)
        response_.current.push({...linesman,...response.data.acf})
        // setNewLinesmen([...newLinesmen,{...linesman, acf: response.data.acf, id : linesman.id}]);
        console.log(response_.current);
      }
      )
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      // return {...linesman, acf:  datas.acf}
    })
    
  }
  const getLinesmanApprove = (id) =>{
    let arr = response_.current.filter((e)=>{if(e.id === id) return e})
    // console.log(arr[0].linesmanapprove)
    // return arr[0].linesmanapprove
  }
useEffect(()=>{
  setIsLoading(true)
  async function fetchdata(){
  const tokens = await getToken();
  token.current = `Bearer ${tokens}`
console.log(token.current)
  axios({
    url:`https://mikaappliances.com/wp-json/wc/v3/customers?role=linesman`,
    headers:{authorization:token.current},
    method:'get',})
    .then(response=>{
    console.log(response.data)
    setLinesmen(response.data)
    
    // setIsLoading(false)
  }).catch(error =>{
    setIsLoading(false);
    console.log(error)
  });
  
}
fetchdata();

setTimeout(()=>{
  fetchLinesmanapprove();
},2000)
setTimeout(()=>{
  setLinesmen(response_.current)
    setIsLoading(false)
},6000)
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
             if(!linesman.linesmanapprove)
            return(
              <tr key={linesman.id} onClick = {() => {navigate('/linesman', {state:linesman})} }>
                <td>{dummydata[count][0]}</td>
                <td>{dummydata[count][1]}</td>
                <td>{linesman.username}</td>
                <td>{linesman.email}</td>
                <td>{linesman.date_created}</td>
                {isLoading? <td></td> :
                <td style={{"color":"green"}}>Pending</td>}
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
   ) } }
  
}

export default UserApproval