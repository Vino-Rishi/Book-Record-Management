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
/**
*Routes: /users
*Method: GET
*Description: Get all users
*Access : Public
*Parameters: None
*/

app.get('/users',(req,res)=>{
    res.status(200).json({
        data: users,
    });
});

/**
*Routes: /users/:id
*Method: GET
*Description: Get info using their ID
*Access : Public
*Parameters: id
*/
app.get('/users/:id',(req,res)=> {
    const {id} = req.params;
    console.log({id});
    const user = users.find((each)=>each.id === id);
    if(!user){
        res.status(404).json({
            success: false,
            "message": "User Doesn't exists"
        });
    }
    return res.status(200).json({
        success: true,
        "message": "User data found",
        data: user,
    });
});

/**
*users: /users
*method: POST
*Description: Adding User details with respective details
*Access : Public
*Parameters: None
*/
app.post('/users',(req,res)=> {
    const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;
    const user = users.find((each)=> each.id === id);
    
    if(user){
        res.status(404).json({
            success: false,
            message: "User ID already Exists"
        });
    }
    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType, 
        subscriptionDate
    });
    return res.status(201).json({
        success: true,
        message: "New User Data Added",
        data: users,
    });
});
/**
*Routes: /users/:id
*Method: GET
*Description: Get info using their ID
*Access : Public
*Parameters: id
*/
app.put('/users/:id',(req,res)=> {
    const {id} = req.params;
    console.log({id});
    const {data} = req.body;
    console.log({data});
    const user = users.find((each)=> each.id === id);
    if(!user){
        res.status(404).json({
            success: false,
            message: "User doesn't exists",
        });
    }
    const updateDataUser = users.map((each)=> {
        if(each.id===id) {
        return{
            ...each,
            ...data,
        };
    }
        return each;
    });
    return res.status(200).json({
        success:true,
        message: "User Data Updated",
        data: updateDataUser,
    });
});

/**
 *routes: users/:id
 *Method: DELETE
 *Description: Delete a user by their ID
 *Access: Public
 *Parameters: ID  
 */
app.delete('/users/:id',(req,res)=>{
    const {id} = req.params;
    console.log({id});
    const {data} = req.body;
    console.log({data});
    const user = users.find((each)=> each.id === id);
    if(!user){
        res.status(404).json({
            success: false,
            message: "User doesn't exists",
        });
    }
})
/**
*users: books
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