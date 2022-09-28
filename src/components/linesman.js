/* eslint-disable no-lone-blocks */
import React, { useState,useEffect } from 'react'
import {useLocation} from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { Alert, Button } from 'react-bootstrap';
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import axios from 'axios';
import {useNavigate} from'react-router-dom'
import { green } from '@material-ui/core/colors';
function Linesman() {
  const navigate =useNavigate();
    const [linesman,setLinesman] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingSnackbar, setIsLoadingSnackbar] = useState(false);
    const [status, setStatus] = useState(false);
    const location = useLocation()
    const [open, setOpen] =  useState(false);
    const incentivedb = [];
    useEffect(()=>{
      setIsLoading(true)
      async function fetchdata(){
      axios({
        url:`https://mikaappliances.com/wp-json/wc/v3/customers/${location.state[0].id}`,
        headers:{authorization:location.state[1]},
        method:'get',})
        .then(response=>{
        console.log(response.data)
        setLinesman(response.data)
        setIsLoading(false);
      }).catch(error =>{
        setIsLoading(false);
        console.log(error)
      });
      
    }
    fetchdata();
    },[])
    
  const approveLinesman = () =>{
    console.log("started....");
    setIsLoadingSnackbar(true);
    axios({url:`https://mikaappliances.com/wp-json/acf/v3/users/${location.state[0].id}?fields[linesmanapprove]=true&fields[points]=${location.state[0].acf.points}&fields[national_id]=${location.state[0].acf.national_id}&fields[phone_number]=${location.state[0].acf.phone_number}`,
    // axios({url:`https://mikaappliances.com/wp-json/acf/v3/users/${location.state[0].id}?fields[national_id]=33239484`,
    headers:{authorization:location.state[1]},
    method:'post'})
    .then(response =>{console.log(response)
    if(response.status === 200){
     setOpen(true)
    }
    setIsLoadingSnackbar(false);})
    setTimeout(() => {
      navigate('/userApproval')
    }, 4000)
    .catch(error =>{
      setIsLoadingSnackbar(false);
      console.log(error)
    })
  }
  const handleToClose = (event, reason) => {
    if ("clickaway" === reason) return;
    setOpen(false);
  };
    {
     if (isLoading) {return <div>Loading...</div>}
    else{ return (
    <div style={{marginLeft:'60px', marginTop:'40px'}}>
        <p>Name : {linesman.username}</p>
        <p>Email : {linesman.email}</p>
        <p>Points: {location.state[0].acf.points}</p>
        <p>Nationa ID : {location.state[0].acf.national_id}</p>
        <p>Phone Number : {location.state[0].acf.phone_number}</p>
        <Button onClick={()=> approveLinesman()}>{!isLoadingSnackbar? 'Approve' : 'Loading...' }</Button>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          message={`Success : ${location.state[0].name} has been approved`}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleToClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
/>
    </div>)
    }
  
  }
}

export default Linesman;