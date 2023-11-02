import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Contact() {    
    const [student, setStudent] = useState([])
    useEffect(()=> {        
        axios.get('http://localhost:8081/home')        
        .then(res => setStudent(res.data))        
        .catch(err => console.log(err));    }, [])
    const handleDelete = async (id) => {        
        try {            
            await axios.delete('http://localhost:8081/contacts/'+id)            
            window.location.reload()        
        }catch(err) {            
            console.log(err);        
        }    
    }
  return (    
  <div className='d-flex vh-100 bg-secondary justify-content-center align-items-center'>  
  
  <div className='w-80 bg-white rounded p-3'> 
  <div style={{ display: 'flex', alignItems: 'center' }}>
  <img
    src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
    height="50"
    width="50"
    alt="User Icon"
  />
  <h3 style={{ marginLeft: '10px' }}>My Contacts</h3>
</div> 
    <br/>
  <Link to="/view-users" className='btn btn-success'>View all users</Link>
  <br/>
  <br/>
  <Link to="/create" className='btn btn-success'>Add Contact+</Link>&nbsp;
  <Link to="/home/view-notes" className='btn btn-success'>View Notes</Link>&nbsp;
  <Link to="/home/view-addr" className='btn btn-success'>View Addresses</Link>&nbsp;
  <Link to="/home/view-history" className='btn btn-success'>Call History</Link>&nbsp;
  <Link to="/home/view-groups" className='btn btn-success'>View Groups</Link>&nbsp;
  <table className='table'>                
  <thead>                    
    <tr>  
        <th>ID</th>                  
        <th>Name</th>                    
        <th>Email</th>  
        <th>Phone Number</th>
        <th>Birthday</th>
        <th>Description</th>                  
        <th>Actions</th>                    
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
            <td>{data.dob}</td>
            <td>{data.descr}</td>                           
            <td> 
                <Link to={`start-call/${data.id}`} className='btn btn-primary me-2'>Call</Link>&nbsp;                                   
                <Link to={`create-note/${data.id}`} className='btn btn-primary me-2'>Notes +</Link>&nbsp;
                <Link to={`create-addr/${data.id}`} className='btn btn-primary me-2'>Address +</Link>&nbsp;
                <Link to={`update/${data.id}`} className='btn btn-primary me-2'>Update</Link>&nbsp;
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
export default Contact