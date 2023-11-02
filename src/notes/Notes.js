import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate,useParams,Link } from 'react-router-dom';


function CreateNote() {    
    const [note, setNote] = useState('')    
    const {id} = useParams(); 
    const navigate = useNavigate();
    function handleSubmit(event) {        
        event.preventDefault();        
        axios.post('http://localhost:8081/create-note/'+id, {note})        
        .then(res => {            
            console.log(res);            
            navigate('/home');        
        }).catch(err => console.log(err));    
    }  return (    
    <div className='d-flex vh-100 bg-secondary justify-content-center align-items-center'>        
    <div className='w-50 bg-white rounded p-3'>            
    <form onSubmit={handleSubmit}>                 
    <h2>Add Note</h2>                
    <div className='mb-2'>                    
    <label htmlFor="">Note</label>                    
    <input type="text" placeholder='Enter Note' className='form-control'                     
    onChange={e => setNote(e.target.value)}                    
    />                
    </div>                
    <button className='btn btn-success'>Submit</button>&nbsp;          
    <Link to="/home" className='btn btn-success'>Cancel</Link>&nbsp;    
    </form>        
    </div>    
    </div>  )}
export default CreateNote