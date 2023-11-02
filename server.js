const express = require("express");
const cors = require("cors");
const { check, validationResult } = require('express-validator');
const mysql = require('mysql');
const moment = require('moment');

const app = express();
app.use(express.json());
app.use(cors());
const db = mysql.createConnection({    
  host: '127.0.0.1',    
  user: "root",    
  password: "niki123",    
  database: "student",
  timezone: 'Asia/Kolkata'
})

//login and signup
app.post('/signup', (req, res) => {    
    const sql = "INSERT INTO login (name,email,password) VALUES (?)";    
    const values = [        
      req.body.name,        
      req.body.email,        
      req.body.password    
    ]    
    db.query(sql, [values], (err, data) => {        
      if(err) {            
        return res.json("Error");        
      }        
      return res.json(data);    
    })
})

app.post('/login',[    
  check('email', "Email length error").isEmail().isLength({min: 10, max:30}),    
  check('password', "password length 8-10").isLength({min: 8, max: 10})], (req, res) => {    
    const sql = "SELECT user_id FROM login WHERE email = ? AND password = ?";    
    db.query(sql, [req.body.email,req.body.password ], (err, data) => {
      const errors = validationResult(req);        
      if(!errors.isEmpty()) {            
        return res.json(errors);        
      } else {            
        if(err) {                
          return res.json("Error");            
        }            
        if(data.length > 0) {                
          return res.json("Success");           
        } else {                
          return res.json("Fail");            
        }        
      }            
    })
})

app.get("/view-users",  (req, res) => {    
  db.query("SELECT name, email from login", (err, data) => {        
    if(err) return res.json("Error");        
    return res.json(data);    
  });
});


//contacts
app.get("/home",  (req, res) => {    
  const user_id=req.params.user_id;
  const sql="select * from contacts";
  db.query(sql, (err, data) => {        
    if(err) return res.json("Error");        
    return res.json(data);    
  });
});

app.post('/create',(req, res) => {   
  const user_id=req.params.user_id; 
  const sql = "INSERT INTO contacts (name, email, pno, dob, descr) VALUES (?)";    
  const values = [        
    req.body.name,        
    req.body.email,
    req.body.pno,
    req.body.dob,
    req.body.descr
  ]    
  db.query(sql, [values], (err, data) => {        
    if(err) return res.json("Error");        
    return res.json(data);    
  })
});

app.put('/update/:id', (req, res) => {    
  const sql = "update contacts set name = ?, email = ?, pno=?, dob=?, descr=? where id = ?";    
  const values = [        
    req.body.name,        
    req.body.email,
  req.body.pno,
req.body.dob,
req.body.descr    ]    
    const id = req.params.id;        
    db.query(sql, [...values, id], (err, data) => {        
      if(err) return res.json("Error");        
      return res.json(data);    
    })
})

app.delete('/contacts/:id', (req, res) => {    
  const sql = "DELETE FROM contacts WHERE id = ?";    
  const id = req.params.id;        
  db.query(sql, [id], (err, data) => {        
    if(err) return res.json("Error");        
    return res.json(data);    
  })
})

//notes
app.get("/view-notes",  (req, res) => {    
  db.query("SELECT s.id, s.name, s.email, s.pno, n.note, n.notedate, n.notetime, n.last_modified FROM contacts s JOIN notes n ON s.id = n.id ", (err, data) => {        
    if(err) return res.json("Error");        
    return res.json(data);    
  });
});


//trigger to update the last_modified time
// DELIMITER //
// CREATE TRIGGER update_last_modified
// BEFORE UPDATE ON notes
// FOR EACH ROW
// SET NEW.last_modified = NOW();
// //
// DELIMITER ;
app.put('/update-note/:id', (req, res) => {    
  const sql = "update notes set note = ?, notedate = ?, last_modified=NOW() where id = ?"; 
  const notedate = moment().format('YYYY-MM-DD');
  const notetime = moment().format('HH:mm:ss');   
  const values = [        
    req.body.note,        
    notedate
  ]    
    const id = req.params.id;        
    db.query(sql, [...values, id], (err, data) => {        
      if(err) return res.json("Error");        
      return res.json(data);    
    })
})

app.post('/create-note/:id', (req,res) => {
  const idFromUrl = req.params.id;
  const notedate = moment().format('YYYY-MM-DD');
  const notetime = moment().format('HH:mm:ss');
  const sql = "INSERT INTO notes (id,note, notedate,notetime) VALUES (?)";    
    const values = [ 
      idFromUrl,            
      req.body.note,        
      notedate,
      notetime 
    ]    
    db.query(sql, [values], (err, data) => {        
      if(err) {            
        return res.json("Error");        
      }        
      return res.json(data);    
    })
})

app.delete('/notes/:id', (req, res) => {    
  const sql = "DELETE FROM notes WHERE ID = ?";    
  const id = req.params.id;      
  
  db.query(sql, [id], (err, data) => {        
    if(err) return res.json("Error");        
    return res.json(data);    
  })
})

//address
app.get("/view-addr",  (req, res) => {    
  db.query("SELECT s.id,s.name, a.house_no, a.street, a.city, a.state, a.country,a.pincode FROM contacts s JOIN address a ON s.id = a.id ", (err, data) => {        
    if(err) return res.json("Error");        
    return res.json(data);    
  });
});


//updatestudentaddress procedure definition:
// DELIMITER //
// CREATE PROCEDURE UpdateStudentAddress(
//     IN contact_id INT,
//     IN house_no VARCHAR(255),
//     IN street VARCHAR(255),
//     IN city VARCHAR(255),
//     IN state VARCHAR(255),
//     IN country VARCHAR(255),
//     IN pincode VARCHAR(10)
// )
// BEGIN
//     UPDATE address
//     SET house_no = house_no,
//         street = street,
//         city = city,
//         state = state,
//         country = country,
//         pincode = pincode
//     WHERE id = (SELECT id FROM contacts WHERE id = contact_id);
// END //
//DELIMITER ;

app.put('/update-addr/:id', (req, res) => {      
  const sql="CALL UpdateContactAddress(?, ?, ?, ?, ?, ?, ?)"
  const values = [        
    req.params.id,
    req.body.house_no,        
    req.body.street,
  req.body.city,
  req.body.state,
  req.body.country,
  req.body.pincode
  ]    
    const id = req.params.id;        
    db.query(sql, [...values], (err, data) => {        
      if(err) return res.json("Error");        
      return res.json(data);    
    })
})

app.post('/create-addr/:id', (req,res) => {
  const idFromUrl = req.params.id;
  const sql = "INSERT INTO address(house_no,street,city,state,country,pincode,id) VALUES (?)";    
    const values = [ 
                 
      req.body.house_no,        
      req.body.street,
      req.body.city,
      req.body.state,
      req.body.country,
      req.body.pincode,
      idFromUrl, 
    ]    
    db.query(sql, [values], (err, data) => {        
      if(err) {            
        return res.json("Error");        
      }        
      return res.json(data);    
    })
})

app.delete('/addr/:id', (req, res) => {    
  const sql = "DELETE FROM address WHERE ID = ?";    
  const id = req.params.id;      
  
  db.query(sql, [id], (err, data) => {        
    if(err) return res.json("Error");        
    return res.json(data);    
  })
})

//call history
app.get("/view-history",  (req, res) => {    
  db.query("SELECT distinct h.start, s.id,s.name, h.calldate, h.end, h.duration FROM contacts s JOIN callhistory h ON s.id = h.id ", (err, data) => {        
    if(err) return res.json("Error");        
    return res.json(data);    
  });
});

app.delete('/history/:callid', (req, res) => {    
  const sql = "DELETE FROM callhistory WHERE CALLID = ?";    
  const id = req.params.callid;      
  
  db.query(sql, [id], (err, data) => {        
    if(err) return res.json("Error");        
    return res.json(data);    
  })
})

app.post('/start-call/:id', (req, res) => {
  const userId = req.params.id;
  const calldate = moment().format('YYYY-MM-DD');
  const startTime = moment().format('HH:mm:ss');

  const insertQuery = 'INSERT INTO callhistory (id, calldate, start) VALUES (?, ?, ?)';
  db.query(insertQuery, [userId, calldate, startTime], (err, result) => {
    if (err) {
      console.error('Error starting call:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Call started successfully' });
  });
});


//calculatecallduration function definition:
// DELIMITER //
// CREATE FUNCTION CalculateCallDuration(start_time DATETIME, end_time DATETIME)
// RETURNS INT
// BEGIN
//     DECLARE duration_seconds INT;
//     SET duration_seconds = TIMESTAMPDIFF(SECOND, start_time, end_time);
//     RETURN duration_seconds;
// END //
// DELIMITER ;

app.put('/end-call/:id', (req, res) => {
  const callId = req.params.id;

  const sql = 'UPDATE callhistory SET end = NOW(), duration = CalculateCallDuration(start, NOW()) WHERE id = ?';
  db.query(sql, [callId], (err, result) => {
    if (err) {
      console.error('Error ending call:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Call ended successfully' });
  });
});

//groups
app.get("/view-groups",  (req, res) => {    
  db.query("SELECT * from groups ", (err, data) => {        
    if(err) return res.json("Error");        
    return res.json(data);    
  });
});

//deleting groups
app.delete('/groups/:group_id', (req, res) => {    
  const sql = "DELETE FROM groups WHERE group_id = ?";    
  const id = req.params.group_id;      
  
  db.query(sql, [id], (err, data) => {        
    if(err) return res.json("Error");        
    return res.json(data);    
  })
})

//deleting members
app.delete('/members/:member_id', (req, res) => {    
  const sql = "DELETE FROM members WHERE member_id = ?";    
  const id = req.params.member_id;      
  
  db.query(sql, [id], (err, data) => {        
    if(err) return res.json("Error");        
    return res.json(data);    
  })
})

//create group
app.post('/create-group', (req,res) => {
  const sql = "INSERT INTO groups (group_name, group_desc) VALUES (?)";    
    const values = [            
      req.body.group_name,        
      req.body.group_desc
    ]    
    db.query(sql, [values], (err, data) => {        
      if(err) {            
        return res.json("Error");        
      }        
      return res.json(data);    
    })
})

//add members of group
app.post('/add-member/:group_id', (req,res) => {
  const gid=req.params.group_id;
  const sql = "INSERT INTO members (group_id, member_name) VALUES (?)";    
    const values = [            
      gid,      
      req.body.member_name
    ]    
    db.query(sql, [values], (err, data) => {        
      if(err) {            
        return res.json("Error");        
      }        
      return res.json(data);    
    })
})

// Get Members of a Group
app.get('/get-members/:group_id', (req, res) => {
  const group_id = req.params.group_id;
  const sql="SELECT s.id, s.name, s.pno, s.email, m.member_id, m.member_name FROM contacts s JOIN members m ON s.name = m.member_name WHERE m.group_id IN (SELECT group_id FROM members WHERE group_id = ?)"
  db.query(sql, [group_id], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});



app.listen(8081, () => {    
  console.log("listening");})

  