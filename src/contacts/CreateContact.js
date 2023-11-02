import axios from 'axios';
import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';


function CreateContact() {    
    const [name, setName] = useState('')    
    const [email, setEmail] = useState('')   
    const [pno, setPno] = useState('')
    const [dob, setDob] = useState('')
    const [descr,setDesc] = useState('')
    const navigate = useNavigate();
    function handleSubmit(event) {        
        event.preventDefault();        
        axios.post('http://localhost:8081/create', {name, email, pno, dob, descr})        
        .then(res => {            
            console.log(res);            
            navigate('/home');        
        }).catch(err => console.log(err));    
    }  return (    
    <div className='d-flex vh-100 bg-secondary justify-content-center align-items-center'>        
    <div className='w-50 bg-white rounded p-3'>            
    <form onSubmit={handleSubmit}>                
    <h2>Add Contact</h2>                
    <div className='mb-2'>                    
    <label htmlFor="">Name</label>                    
    <input type="text" placeholder='Enter Name' className='form-control'                     
    onChange={e => setName(e.target.value)}                    
    />                
    </div>                
    <div className='mb-2'>                    
    <label htmlFor="">Email</label>                    
    <input type="email" placeholder='Enter Email' className='form-control'                    
    onChange={e => setEmail(e.target.value)}/>                
    </div>                
    <div className='mb-2'>                    
    <label htmlFor="">Phone Number</label>                    
    <input type="text" placeholder='Enter Phone Number' className='form-control'                     
    onChange={e => setPno(e.target.value)}                    
    />                
    </div> 
    <div className='mb-2'>                    
    <label htmlFor="">Birthday</label>                    
    <input type="date" className='form-control'                     
    onChange={e => setDob(e.target.value)}                    
    />                
    </div> 
    <div className='mb-2'>                    
    <label htmlFor="">Description/Relationship</label>                    
    <input type="text" placeholder='Enter Description' className='form-control'                     
    onChange={e => setDesc(e.target.value)}                    
    />                
    </div> 
    <button className='btn btn-success'>Submit</button>&nbsp;
    <Link to="/home" className='btn btn-success'>Cancel</Link>&nbsp;           
    </form>        
    </div>    
    </div>  )}
export default CreateContact