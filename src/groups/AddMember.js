import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate,useParams,Link } from 'react-router-dom';


function AddMember() {    
    const [member_name, setName] = useState('')    
    const {group_id} = useParams();
    const navigate = useNavigate();
    function handleSubmit(event) {        
        event.preventDefault();        
        axios.post('http://localhost:8081/add-member/'+group_id, {member_name})        
        .then(res => {            
            console.log(res);            
            navigate('/home/view-groups');        
        }).catch(err => console.log(err));    
    }  return (    
    <div className='d-flex vh-100 bg-secondary justify-content-center align-items-center'>        
    <div className='w-50 bg-white rounded p-3'>            
    <form onSubmit={handleSubmit}>                 
    <h2>Add Member</h2>                
    <div className='mb-2'>                    
    <label htmlFor="">Member Name</label>                    
    <input type="text" placeholder='Enter Name' className='form-control'                     
    onChange={e => setName(e.target.value)}                    
    />                
    </div>                
    <button className='btn btn-success'>Submit</button>&nbsp;          
    <Link to="/home/view-groups" className='btn btn-success'>Cancel</Link>&nbsp;    
    </form>        
    </div>    
    </div>  )}
export default AddMember