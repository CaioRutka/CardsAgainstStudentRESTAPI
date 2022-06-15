const BlackCard = require('../models/BlackCard');

module.exports = { 
    // LISTA DE TODAS AS CARTAS JÁ CRIADAS
    async index(req, res){
        const blackcards = await BlackCard.find().sort('-createdAt');

        return res.json(blackcards);
    },

    // IRÁ CRIAR UM NOVA CARTA COM A FRASE PASSADA NO BODY DO MULTIFORM
    async store(req, res){
        try{    
            BlackCardPhrase = req.body.BlackCardPhrase; 

            iterator = 1;
            lastBlackCardIndex = iterator;

            while (iterator <= 50){
                lastBlackCard = await BlackCard.findOne({BlackCardID: iterator });
                if(lastBlackCard !== null){
                    lastBlackCardIndex = iterator+1;
                }                
                iterator ++;
            }      

            BlackCardID = lastBlackCardIndex;

            const blackcard = await BlackCard.create({  
                BlackCardPhrase,
                BlackCardID,                                                                        
            });

            req.io.emit('New Black Card', blackcard);

            return res.json({blackcard}
            );
        }catch(error){
            console.log(error.message);
        }  
    },        
    
    // DELETA A CARTA DE ACORDO COM O ID PASSADO NOS PARAMETRO DO URL
    async delete(req,res){
        try{
            const code = req.params.code;

            await BlackCard.deleteOne({ BlackCardID: code });

            return res.json({'status':'deleted'})        
        } catch(error){
            console.log(error.message)
        }
    },

    // FIND A CARTA DE ACORDO COM O ID PASSADO NOS PARAMETRO DO URL
    async findBlackCardByID(req, res){
        try{  
            const code = req.params.code;

            const blackcard = await BlackCard.findOne({BlackCardID: code});

            if (blackcard == null){
                return res.json({'status':'NAOACHOU'});
            } else if (blackcard != null){
                return res.json(blackcard);
            }
  
        }catch(error){
            console.log(error.message);
        }  
    },
};