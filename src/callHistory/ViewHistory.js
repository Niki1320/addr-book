import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function ViewHistory() {    
    const [student, setStudent] = useState([])
    useEffect(()=> {        
        axios.get('http://localhost:8081/view-history')        
        .then(res => setStudent(res.data))        
        .catch(err => console.log(err));    }, [])
    const handleDelete = async (callid) => {        
        try {            
            await axios.delete('http://localhost:8081/history/'+callid)            
            window.location.reload()        
        }catch(err) {            
            console.log(err);        
        }    
    }
  return (    
  <div className='d-flex vh-100 bg-secondary justify-content-center align-items-center'>        
  <div className='w-80 bg-white rounded p-3'>  
  <Link to="/home" className='btn btn-success'>Contacts</Link>&nbsp;    
  <br/> <br/>
  <h3>Call History</h3>                
  <table className='table'>                
  <thead>                    
    <tr>                  
        <th>Name</th> 
        <th>Date</th>                   
        <th>Start time</th>  
        <th>End time</th>
        <th>Duration (seconds)</th>                     
        {/* <th>Actions</th>           */}
        </tr>                
        </thead>                
        <tbody>                    
            {                        
            student.map((data, i)=> (                            
            <tr key={i}>                         
            <td>{data.name}</td>                                
            <td>{data.calldate}</td>     
            <td>{data.start}</td>
            <td>{data.end}</td>   
            <td>{data.duration}</td>                   
            {/* <td>                                    
                <button className='btn btn-danger ms-2' onClick={ e => handleDelete(data.callid)}>Delete</button>
                                                
                </td>                             */}
                </tr>                        
                ))                    
                }                
                </tbody>            
                </table>        
                </div>    
                </div>  
                )}
export default ViewHistory