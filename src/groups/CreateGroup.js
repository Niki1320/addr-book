import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate,useParams,Link } from 'react-router-dom';


function CreateGroup() {    
    const [group_name, setName] = useState('')    
    const [group_desc, setDesc] = useState('') 
    const navigate = useNavigate();
    function handleSubmit(event) {        
        event.preventDefault();        
        axios.post('http://localhost:8081/create-group/', {group_name,group_desc})        
        .then(res => {            
            console.log(res);            
            navigate('/home/view-groups');        
        }).catch(err => console.log(err));    
    }  return (    
    <div className='d-flex vh-100 bg-secondary justify-content-center align-items-center'>        
    <div className='w-50 bg-white rounded p-3'>            
    <form onSubmit={handleSubmit}>                 
    <h2>Create Group</h2>                
    <div className='mb-2'>                    
    <label htmlFor="">Group Name</label>                    
    <input type="text" placeholder='Enter Name' className='form-control'                     
    onChange={e => setName(e.target.value)}                    
    />                
    </div> 
    <div className='mb-2'>                    
    <label htmlFor="">Group Description</label>                    
    <input type="text" placeholder='Enter description' className='form-control'                     
    onChange={e => setDesc(e.target.value)}                    
    />                
    </div>                
    <button className='btn btn-success'>Submit</button>&nbsp;          
    <Link to="/home/view-groups" className='btn btn-success'>Cancel</Link>&nbsp;    
    </form>        
    </div>    
    </div>  )}
export default CreateGroup