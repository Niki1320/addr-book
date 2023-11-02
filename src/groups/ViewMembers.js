import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

function ViewMembers() {    
    const [student, setStudent] = useState([])
    const {group_id} = useParams()
    useEffect(()=> {        
        axios.get('http://localhost:8081/get-members/'+group_id)        
        .then(res => setStudent(res.data))        
        .catch(err => console.log(err));    }, [])
    const handleDelete = async (id) => {        
        try {            
            await axios.delete('http://localhost:8081/members/'+id)            
            window.location.reload()        
        }catch(err) {            
            console.log(err);        
        }    
    }
  return (    
  <div className='d-flex vh-100 bg-secondary justify-content-center align-items-center'>        
  <div className='w-80 bg-white rounded p-3'>  
  <Link to="/home/view-groups" className='btn btn-success'>Groups</Link>&nbsp;         
  <br/> <br/>
  <h3>Group Members</h3>           
  <table className='table'>                
  <thead>                    
    <tr>                    
        <th>Name</th>                    
        <th>Phone Number</th>  
        <th>Email</th>              
        <th>Action</th>                    
        </tr>                
        </thead>                
        <tbody>                    
            {                        
            student.map((data, i)=> (                            
            <tr key={i}>                              
            <td>{data.name}</td>                                
            <td>{data.pno}</td>  
            <td>{data.email}</td>                   
            <td>                                    
                <button className='btn btn-danger ms-2' onClick={ e => handleDelete(data.member_id)}>Delete</button>
                                                
                </td>                            
                </tr>                        
                ))                    
                }                
                </tbody>            
                </table>        
                </div>    
                </div>  
                )}
export default ViewMembers