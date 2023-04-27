const Pool = require('pg').Pool 

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'sampleusers',
    password:  '12345',
    port: 5432 

})

//crud operations with postgresql database 

const getUsers =(req, res) => {
    pool.query("SELECT * FROM users ORDER BY id DESC",(err,results) => {
        if(err){
            throw err;
        }
        res.status(200).json(results.rows)
    })
}

const createUser = (req, res) => {
    const { name, email } = req.body;

    pool.query(
        'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
        [name, email] // fixed arguments here
    )
    .then(() => res.status(201).send('User Created successfully'))
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error Creating user');
    });
}

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error deleting user');
      }
      if (result.rowCount === 0) {
        return res.status(404).send(`User with ID ${id} not found`);
      }
      res.status(200).send(`User deleted with ID ${id}`);
    });
  };

  const updateUser = (req,res) => {
    const id = parseInt(req.params.id)
    const {name,email} = req.body

    pool.query("UPDATE users SET name = $1,email=$2 WHERE id=$3",
    [name,email,id],(err,result) => {
        if(err){
            throw err
        }
        res.status(200).send(`User modified with id ${id}`)
    })
  }
  
module.exports = {
    getUsers,
    createUser,
    deleteUser,
    updateUser
}





