import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate,useParams,Link } from 'react-router-dom';


function CreateAddr() {    
    const [house_no, setNumber] = useState('')    
    const [street, setStreet] =useState('')
    const [city,setCity]=useState('')
    const [state,setState]=useState('')
    const [country,setCountry]=useState('')
    const [pincode,setPincode]=useState('')
    const {id} = useParams(); 
    const navigate = useNavigate();
    function handleSubmit(event) {        
        event.preventDefault();        
        axios.post('http://localhost:8081/create-addr/'+id, {house_no, street, city, state, country, pincode})        
        .then(res => {            
            console.log(res);            
            navigate('/home');        
        }).catch(err => console.log(err));    
    }  return (    
    <div className='d-flex vh-100 bg-secondary justify-content-center align-items-center'>        
    <div className='w-50 bg-white rounded p-3'>            
    <form onSubmit={handleSubmit}>                 
    <h2>Add Address</h2>                
    <div className='mb-2'>                    
    <label htmlFor="">House Number</label>                    
    <input type="text" placeholder='Enter House Number' className='form-control'                     
    onChange={e => setNumber(e.target.value)}                    
    />                
    </div>                
    <div className='mb-2'>                    
    <label htmlFor="">Street</label>                    
    <input type="text" className='form-control'                    
    onChange={e => setStreet(e.target.value)}/>                
    </div>
    <div className='mb-2'>                    
    <label htmlFor="">City</label>                    
    <input type="text" className='form-control'                    
    onChange={e => setCity(e.target.value)}/>                
    </div> 
    <div className='mb-2'>                    
    <label htmlFor="">State</label>                    
    <input type="text" className='form-control'                    
    onChange={e => setState(e.target.value)}/>                
    </div>          
    <div className='mb-2'>                    
    <label htmlFor="">Country</label>                    
    <input type="text" className='form-control'                    
    onChange={e => setCountry(e.target.value)}/>                
    </div>       
    <div className='mb-2'>                    
    <label htmlFor="">Pincode</label>                    
    <input type="text" className='form-control'                    
    onChange={e => setPincode(e.target.value)}/>                
    </div> 
    <button className='btn btn-success'>Submit</button>&nbsp;          
    <Link to="/home" className='btn btn-success'>Cancel</Link>&nbsp;    
    </form>        
    </div>    
    </div>  )}
export default CreateAddr