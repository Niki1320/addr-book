import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function ViewNotes() {    
    const [student, setStudent] = useState([])
    useEffect(()=> {        
        axios.get('http://localhost:8081/view-notes')        
        .then(res => setStudent(res.data))        
        .catch(err => console.log(err));    }, [])
    const handleDelete = async (id) => {        
        try {            
            await axios.delete('http://localhost:8081/notes/'+id)            
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
  <h3>My Notes</h3>
                     
  <table className='table'>                
  <thead>                    
    <tr>                    
        <th>ID</th>
        <th>Name</th>                    
        <th>Email</th>  
        <th>Phone Number</th>
        <th>Note</th>  
        <th>Date</th>
        <th>Time</th>       
        <th>Last Modified</th>         
        <th>Action</th>                    
        </tr>                
        </thead>                
        <tbody>                    
            {                        
            student.map((data, i)=> (                            
            <tr key={i}>      
            <td>{data.id}</td>                          
            <td>{data.name}</td>                                
            <td>{data.email}</td>     
            <td>{data.pno}</td>
            <td>{data.note}</td>   
            <td>{data.notedate}</td>   
            <td>{data.notetime}</td>  
            <td>{data.last_modified}</td>                  
            <td>                                    
                <Link to={`update-note/${data.id}`} className='btn btn-primary me-2'>Update</Link>&nbsp;
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
export default ViewNotes