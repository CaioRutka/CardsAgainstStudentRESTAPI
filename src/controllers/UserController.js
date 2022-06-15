const User = require('../models/User');

module.exports = {
    async index(req, res){
        const users = await User.find().sort('-createdAt');

        return res.json(users);
    },

    async store(req, res){
        try{                      
            username = req.body.username;
            password = req.body.password;
            userKind = req.body.userKind;

            const user = await User.create({         
                username,
                password,    
                userKind,                                
            });

            req.io.emit('user', user);

            return res.json({user}
            );
        }catch(error){
            console.log(error.message);
            return res.json({error: error.message});
        }  
    },

    async delete(req,res){
        try{
            username = req.body.username;

            await User.deleteOne({ username: username }); 

            return res.json({'status':'deleted'})        
        } catch(error){
            console.log(error.message)
        }
    },
    
    async login(req, res){
        try{  
            username = req.body.username;
            password = req.body.password;

            const Users = await User.findOne({username: username, password: password});

            if (Users == null){
                return res.json({'status':'NAOACHOU'});
            } else if (Users != null){
                return res.json({
                    'status':'ACHOU',
                    'username': Users.username,
                    'userKind': Users.userKind,
                    'matchesNumber': Users.matchesNumber,
                    'roundsNumber': Users.roundsNumber,
                    'winningMatches': Users.winningMatches,
                    'winningRounds': Users.winningRounds
                }                    
                );
            }
        }catch(error){
            console.log(error.message);
        }  
    },
};