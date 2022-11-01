//importing modules
const db = require("../models");
//Assigning db.users to User variable
 const User = db.user;

//Function to check if names or email already exist in the database
//this is to avoid having two users with the same names and email
 const saveUser = async (req, res, next) => {

 //search the database to see if user exist
 try {
   const names = await User.findOne({
     where: {
       names: req.body.names,
     },
   });
   //if names exist in the database respond with a status of 409
   if (names) {
     return res.json(409).send("names already taken");
   }

   //checking if email already exist
   const emailcheck = await User.findOne({
     where: {
       email: req.body.email,
     },
   });

   //if email exist in the database respond with a status of 409
   if (emailcheck) {
     return res.json(409).send("Authentication failed");
   }

   next();
 } catch (error) {
   console.log(error);
 }
};

//exporting module
 module.exports = {
 saveUser,
};