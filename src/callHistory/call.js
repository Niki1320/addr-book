import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

function Call() {    
      const {id} = useParams();    const navigate = useNavigate();
    const [student, setStudent] = useState([])
    useEffect(()=> {        
        axios.post('http://localhost:8081/start-call/'+id)        
        .then(res => setStudent(res.data))        
        .catch(err => console.log(err));    }, [])
    
function handleEnd() {              
      axios.put('http://localhost:8081/end-call/'+id)        
      .then(res => {            
          console.log(res);            
          navigate('/home');        
      }).catch(err => console.log(err));    
  }
  return (    
  <div className='d-flex vh-100 bg-secondary justify-content-center align-items-center'>  
  
  <div className='w-98 bg-white rounded p-3'>   
  <h1 className="text-center">Calling...      </h1>
        <img src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" height={150} width={150}/>
        <br/>
        <br/>
        <br/>
        <div className="text-center mt-3">
        <button className='btn btn-danger ms-2' onClick={ e => handleEnd()}>End Call</button>&nbsp;
          </div>       
                </div>    
                </div>  
                )}
export default Call