import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function ViewUsers() {    
    const [student, setStudent] = useState([])
    useEffect(()=> {        
        axios.get('http://localhost:8081/view-users')        
        .then(res => setStudent(res.data))        
        .catch(err => console.log(err));    }, [])
    const handleDelete = async (id) => {        
        try {            
            await axios.delete('http://localhost:8081/student/'+id)            
            window.location.reload()        
        }catch(err) {            
            console.log(err);        
        }    
    }
  return (    
  <div className='d-flex vh-100 bg-secondary justify-content-center align-items-center'>  
  
  <div className='w-80 bg-white rounded p-3'>    
  
  <Link to="/home" className='btn btn-success'>Contacts</Link>
  <br/> <br/>  
  <h3>Users</h3>  
             
  <table className='table'>                
  <thead>                    
    <tr>                    
        <th>Name</th>                    
        <th>Email</th>                   
                         
        </tr>                
        </thead>                
        <tbody>                    
            {                        
            student.map((data, i)=> (                            
            <tr key={i}>                                
            <td>{data.name}</td>                                
            <td>{data.email}</td>                                                        
                </tr>                        
                ))                    
                }                
                </tbody>            
                </table> 
                      
                </div>    
                </div>  
                )}
export default ViewUsers