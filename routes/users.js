const express = require('express');
const { users } = require('../data/users.json');
const router = express.Router();

// Routes and Users
/**
*Routes: /users
*Method: GET
*Description: Get all users
*Access : Publi
*Parameters: None
*/

router.get('/users',(req,res)=>{
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
router.get('/users/:id',(req,res)=> {
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
router.post('/users',(req,res)=> {
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
*Method: PUT
*Description: Updating data using their ID
*Access : Public
*Parameters: id
*/
router.put('/users/:id',(req,res)=> {
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
router.delete('/users/:id',(req,res)=>{
    const {id} = req.params;
    console.log({id});
    const {data} = req.body;
    const user = users.find((each)=> each.id === id);
    if(!user){
        res.status(404).json({
            success: false,
            message: "User doesn't exists",
        });
    }
    const index = users.indexOf(user);
    users.splice(index,1)
    return res.status(200).json({
        success: true,
        message: "Deleted user data",
        data: users
    });
})

module.exports = router;