import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function ViewAddress() {    
    const [student, setStudent] = useState([])
    useEffect(()=> {        
        axios.get('http://localhost:8081/view-addr')        
        .then(res => setStudent(res.data))        
        .catch(err => console.log(err));    }, [])
    const handleDelete = async (id) => {        
        try {            
            await axios.delete('http://localhost:8081/addr/'+id)            
            window.location.reload()        
        }catch(err) {            
            console.log(err);        
        }    
    }
  return (    
  <div className='d-flex vh-100 bg-secondary justify-content-center align-items-center'>        
  <div className='w-80 bg-white rounded p-3'>  
  <Link to="/home" className='btn btn-success'>Contacts</Link>&nbsp; 
  <br/><br/>
  <h3>Contact Addresses</h3>                   
  <table className='table'>                
  <thead>                    
    <tr>                 
        <th>ID</th>   
        <th>Name</th>                    
        <th>House Number</th>  
        <th>Street</th>
        <th>City</th>                
        <th>State</th>  
        <th>Country</th>  
        <th>Pincode</th>      
        <th>Actions</th>          
        </tr>                
        </thead>                
        <tbody>                    
            {                        
            student.map((data, i)=> (                            
            <tr key={i}>  
            <td>{data.id}</td>                           
            <td>{data.name}</td>                                
            <td>{data.house_no}</td>     
            <td>{data.street}</td>
            <td>{data.city}</td>   
            <td>{data.state}</td>   
            <td>{data.country}</td>  
            <td>{data.pincode}</td>                  
            <td>                                    
                <Link to={`update-addr/${data.id}`} className='btn btn-primary me-2'>Update</Link>&nbsp;
                <button className='btn btn-danger ms-2' onClick={ e => handleDelete(data.id)}>Delete</button>
                                                
                </td>                            
                </tr>                        
                ))                    
                }                
                </tbody>            
                </table>        
                </div>    
                </div>  
                )}
export default ViewAddress