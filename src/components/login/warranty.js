import React, { useState } from 'react'
import {useLocation} from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
function Warranty() {
    const [warranty,setWarranty] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation()
    const incentivedb = [];
    const linesmanid =20;
    const display =()=>{
        for (const [key,value] of Object.entries(location.state)) {
           warranty.push([key,value])
        }
        console.log(warranty);
    }
    display();
    const addPoints= async ()=>{
        //use linesman id and model number
        //find incentive amount using model number
        const points = incentivedb.filter((item)=>{
            if(item.modelNumber === warranty.modelNumber){
                return item.incentiveAmount
            }
            return false;
        })
        //take the points and update linesman account
        try{
            let response = await fetch({URL:`https://mikaappliances.com/wp-json/acf/v3/users/${linesmanid}?fields[points]=`,
            method:'post',
            body: JSON.stringify({
                "acf": 
                {      
                     "points": points
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
    const approve= () =>{
        //update status of warranty to approved
        //then add points to linesman
        addPoints();
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