import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function ViewGroups() {    
    const [student, setStudent] = useState([])
    useEffect(()=> {        
        axios.get('http://localhost:8081/view-groups')        
        .then(res => setStudent(res.data))        
        .catch(err => console.log(err));    }, [])
    const handleDelete = async (id) => {        
        try {            
            await axios.delete('http://localhost:8081/groups/'+id)            
            window.location.reload()        
        }catch(err) {            
            console.log(err);        
        }    
    }
  return (    
  <div className='d-flex vh-100 bg-secondary justify-content-center align-items-center'>        
  <div className='w-80 bg-white rounded p-3'>  
  <Link to="/home" className='btn btn-success'>Contacts</Link>&nbsp;  
  <Link to="/home/create-group" className='btn btn-success'>Create Group</Link>&nbsp; 
  <br/> <br/>
  <h3>My Groups</h3>
  <table className='table'>                
  <thead>                    
    <tr>                    
        <th>Group Name</th>                    
        <th>Group Description</th>                
        <th>Action</th>                    
        </tr>                
        </thead>                
        <tbody>                    
            {                        
            student.map((data, i)=> (                            
            <tr key={i}>                              
            <td>{data.group_name}</td>                                
            <td>{data.group_desc}</td>                     
            <td>                                    
                <Link to={`get-members/${data.group_id}`} className='btn btn-primary me-2'>View Group</Link>&nbsp;
                <Link to={`add-member/${data.group_id}`} className='btn btn-primary me-2'>Add Member</Link>&nbsp;
                <button className='btn btn-danger ms-2' onClick={ e => handleDelete(data.group_id)}>Delete</button>
                                                
                </td>                            
                </tr>                        
                ))                    
                }                
                </tbody>            
                </table>        
                </div>    
                </div>  
                )}
export default ViewGroups