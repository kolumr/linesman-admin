import React, { useState } from 'react'
import {useLocation} from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
function Linesman() {
    const [linesman,setLinesman] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(false);
    const location = useLocation()
    const incentivedb = [];
    const display =()=>{
        for (const [key,value] of Object.entries(location.state)) {
           linesman.push([key,value])
        }
        console.log(linesman);
    }
    display();
    const approveLinesman = async ()=>{
       
        try{
            let response = await fetch({URL:`https://mikaappliances.com/wp-json/acf/v3/users/${location.state.id}?fields[linesman]=${status}`,
            method:'post',
            body: JSON.stringify({
                "acf": 
                {      
                     "linesmanapprove": status
                }
            })
        }); let json = await response.json();
        console.log(json);
        if (json.status !== false) {
          setIsLoading(false);
          

        } 
        
       }catch (error) {
        setIsLoading(false);
        console.error(error);
       
      }
    }
 
  return (
    <div>
        <Table bordered size='sm' >
            <thead>
                <tr>
                    <td>Key</td>
                    <td>Value</td>
                </tr>
                
            </thead>
            <tbody>
             { linesman.map((e) =>{
                return(
                <tr>
                    <td>{e[0]}</td>
                    <td>{e[1]}</td>
                </tr>)
             })
                }
            </tbody>
        </Table>
        <Button onClick={approveLinesman}>Approve</Button>
    </div>

  )
}

export default Linesman;