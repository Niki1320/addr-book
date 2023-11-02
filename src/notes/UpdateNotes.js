import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate,useParams,Link } from 'react-router-dom';


function UpdateNote() {    
    const [note, setNote] = useState('')    
    const {id} = useParams();    const navigate = useNavigate();
    function handleSubmit(event) {        
        event.preventDefault();        
        axios.put('http://localhost:8081/update-note/'+id, {note})        
        .then(res => {            
            console.log(res);            
            navigate('/home/view-notes');        
        }).catch(err => console.log(err));    
    } return (    
    <div className='d-flex vh-100 bg-secondary justify-content-center align-items-center'>        
    <div className='w-50 bg-white rounded p-3'>            
    <form onSubmit={handleSubmit}>       
             
    <h2>Update Note</h2>                
    <div className='mb-2'>                    
    <label htmlFor="">Note</label>                    
    <input type="text" placeholder='Enter Note' className='form-control'                     
    onChange={e => setNote(e.target.value)}                    
    />                
    </div>                     
    <button className='btn btn-success'>Submit</button>&nbsp; 
    <Link to="/home/view-notes" className='btn btn-success'>Cancel</Link>&nbsp;             
    </form>        
    </div>    
    </div>  )}
export default UpdateNote