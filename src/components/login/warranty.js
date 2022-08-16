import React, { useState } from 'react'
import {useLocation} from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
function Warranty() {
    const [warranty,setWarranty] = useState([])
    const location = useLocation()
    const display =()=>{
        for (const [key,value] of Object.entries(location.state)) {
           warranty.push([key,value])
        }
        console.log(warranty);
    }
    display();
    console.log(warranty);
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
             { warranty.map((e) =>{
                return(
                <tr>
                    <td>{e[0]}</td>
                    <td>{e[1]}</td>
                </tr>)
             })
                }
            </tbody>
        </Table>
        <Button>Approve</Button>
    </div>

  )
}

export default Warranty