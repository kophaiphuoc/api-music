const { users } = require("../models/user");
const bcrypt = require('bcrypt');

const usercontroller = {
    register: async(req,res,next) => {
        try {
            const new_register = new users({
                email:req.body.email ,
                name:req.body.name,
                password:bcrypt.hashSync(req.body.password,8)
            });
            if(
                req.body.email == null,
                req.body.name == null,
                req.body.password == null
            ){
                res.status(201).json({
                    "code":0,
                    "mess":"resgister failed"
                })
            }
            else{  
                await new_register.save();
                res.status(200).json({
                    "code":1,
                    "mess":"resgister successfully"
                });

            }
        } catch (error) {
            res.status(500).json(error)
        }
    },
    checklogin: async(req,res,next)=>{
        try {
            const name_user = await users.find({email:req.body.email});
            const pass = name_user[0].password;
                const match = await bcrypt.compare(req.body.password,pass);
                if(match) {
                   res.status(200).json({
                    "code":1,
                    "mess":"login successful"
                   });
                }else{
                    res.status(201).json({
                        "code":0,
                        "mess":"login failed"
                       });
                }    
        } catch (error) {
            res.status(500).json(error);
        }
    },
}
module.exports = usercontroller;