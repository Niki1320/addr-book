import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import CreateContact from './contacts/CreateContact';
import Contact from './contacts/Contact';
import UpdateContact from './contacts/Update';
import Login from './auth/Login';
import Signup from './auth/Signup';
import CreateNote from './notes/Notes';
import ViewNotes from './notes/ViewNotes';
import UpdateNote from './notes/UpdateNotes';
import ViewUsers from './auth/ViewUsers';
import CreateAddr from './address/Address';
import ViewAddress from './address/ViewAddresses';
import UpdateAddress from './address/UpdateAddress';
import ViewHistory from './callHistory/ViewHistory';
import Call from './callHistory/call';
import ViewGroups from './groups/ViewGroups';
import CreateGroup from './groups/CreateGroup';
import AddMember from './groups/AddMember';
import ViewMembers from './groups/ViewMembers';

function App() {  return (    
<div className="App">      
<BrowserRouter>        
<Routes>          
  <Route path='/' element={<Login />}></Route>   
  <Route path='/signup' element={<Signup />}></Route>         
  <Route path='/home' element={<Contact />}></Route>      
  <Route path='/create' element={<CreateContact />}></Route>          
  <Route path='/home/update/:id' element={<UpdateContact />}></Route>    
  <Route path='/home/create-note/:id' element={<CreateNote/>}></Route> 
  <Route path='/home/view-notes' element={<ViewNotes/>}></Route>
  <Route path='home/view-notes/update-note/:id' element={<UpdateNote/>}></Route>
  <Route path='/view-users' element={<ViewUsers/>}></Route>
  <Route path='/home/view-addr' element={<ViewAddress/>}></Route>
  <Route path='/home/create-addr/:id' element={<CreateAddr/>}></Route>
  <Route path='/home/view-addr/update-addr/:id' element={<UpdateAddress/>}></Route>
  <Route path='/home/view-history' element={<ViewHistory/>}></Route>
  <Route path='/home/start-call/:id' element={<Call/>}></Route>
  <Route path='/home/view-groups' element={<ViewGroups/>}></Route>
  <Route path='/home/create-group' element={<CreateGroup/>}></Route>
  <Route path='/home/view-groups/add-member/:group_id' element={<AddMember/>}></Route>
  <Route path='/home/view-groups/get-members/:group_id' element={<ViewMembers/>}></Route>
  </Routes>      
  </BrowserRouter>    
  </div>  
  );
}
export default App;