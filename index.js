const express = require('express');
const app = express();
const { users } = require('./data/users.json');
const { books } = require('./data/books.json');
const PORT = 3500;

app.use(express.json());

// Display home directory message
app.get('/',(req,res)=> {
    res.status(200).json({
        "message": "Node server is up and running :-)"
    });
});

// Routes and Users
/*users: http:/localhost/users
*Description: Get all users
*Access : Public
*Parameters: None
 */

app.get('/users',(req,res)=>{
    res.status(200).json({
        data: users,
    });
})

// Routes and Books
/*users: http:/localhost/users
*Description: Get all Books
*Access : Public
*Parameters: None
 */

app.get('/books',(req,res)=>{
    res.status(200).json({
        data: books,
    });
})


app.get("*",(req,res)=> {
    res.status(404).json({
        "message": "This page doesn't exists"
    });
});

//Displays running PORT Details

app.listen(PORT, ()=> {
    console.log(`Node Server Running PORT on ${PORT}`);
})