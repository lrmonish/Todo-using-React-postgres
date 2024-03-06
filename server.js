const express = require('express');
const pool = require('./db'); 
const cors = require('cors');

const app = express();

app.use(express.json()); 

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})


app.post('/data', async (req, res) => {
  try {
    const user = req.body;

    let insertQuery = `insert into tasks(idn, text, completed) 
                       values(${user.id}, '${user.text}', '${user.completed}')`

    const new_user = await pool.query(insertQuery);

    res.json(`User added`);

  } catch (error) {
   
    res.status(500).json(error);
  }
});


app.get('/getdata', async (req, res) => {
    try {
      const new_user = await pool.query('SELECT * FROM tasks;');
  
      res.json(new_user.rows);
    } catch (error) {
      // console.error(error);
      res.status(500).json(error);
    }
  });



  app.get('/getdatabyid/:id', async (req, res) => {
    try {
        const id = req.params.id;

      const new_user = await pool.query(`SELECT * FROM tasks WHERE idn =${id}`);
  
      res.json(new_user.rows);
    } catch (error) {
      res.status(500).json(error);
    }
  });


app.put('/updateUser/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const user = req.body;
      
      const updateQuery = `
        UPDATE tasks
        SET text = $1,
            completed = $2
        WHERE idn = $3;
      `;
  
      const values = [user.text, user.completed, id]; 
  
      const result = await pool.query(updateQuery, values);
  
      if (result.rowCount === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json({ message: 'User updated successfully' });
      }
    } catch (error) {
      // console.error(error);
      res.status(500).json(error); 
    }
  });

 
app.delete('/deleteUser/:id',async (req, res)=>{

    try{
          const id = req.params.id;
          const query = 'DELETE FROM tasks WHERE idn = $1';
          const val =[id];
          const result = await pool.query(query, val);
          res.json("successful").status(200);

    } catch{

 res.status(400).send(`User deleted`)
    }
})

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
