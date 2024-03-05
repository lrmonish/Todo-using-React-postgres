const express = require('express');
const pool = require('./db'); 

const app = express();

app.use(express.json()); 



app.post('/data', async (req, res) => {
  try {
    const user = req.body;

    let insertQuery = `insert into users(id, firstname, lastname) 
                       values(${user.id}, '${user.firstname}', '${user.lastname}')`

    const new_user = await pool.query(insertQuery);

    res.json(`User added`);

  } catch (error) {
   
    res.status(500).json(error);
  }
});


app.get('/getdata', async (req, res) => {
    try {
      const new_user = await pool.query('SELECT * FROM users;');
  
      res.json(new_user.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting data' });
    }
  });



  app.get('/getdatabyid/:id', async (req, res) => {
    try {
        const id = req.params.id;

      const new_user = await pool.query(`SELECT * FROM users WHERE id =${id}`);
  
      res.json(new_user.rows);
    } catch (error) {
      res.status(500).json(error);
    }
  });


// app.put('/updateUser/:id', async(req, res)=>{

// try{
//     const id = req.params.id;
//     const user = req.body;
//     let updateQuery = `UPDATE users
//                        set firstname = '${user.firstname}',
//                        lastname = '${user.lastname}',
//                        where id = ${user.id}`
    
//     const new_user = await pool.query(updateQuery);
 
//      res.json(new_user);

// }catch(error){

//     res.status(500).json(error);
// }
// });


app.put('/updateUser/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const user = req.body;
      
      const updateQuery = `
        UPDATE users
        SET firstname = $1,
            lastname = $2
        WHERE id = $3;
      `;
  
      const values = [user.firstname, user.lastname, id]; 
  
      const result = await pool.query(updateQuery, values);
  
      if (result.rowCount === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json({ message: 'User updated successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' }); 
    }
  });

 
app.delete('/deleteUser/:id',async (req, res)=>{

    try{
          const id = req.params.id;
          const query = 'DELETE FROM users WHERE id = $1';
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
