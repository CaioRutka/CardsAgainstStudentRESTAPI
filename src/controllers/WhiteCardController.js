const WhiteCard = require('../models/WhiteCard');

module.exports = {
    // LISTA DE TODAS AS CARTAS JÁ CRIADAS
    async index(req, res){
        const whitecards = await WhiteCard.find().sort('-createdAt');

        return res.json(whitecards);
    },

    // IRÁ CRIAR UM NOVA CARTA COM A FRASE PASSADA NO BODY DO MULTIFORM
    async store(req, res){
        try{    
            WhiteCardPhrase = req.body.WhiteCardPhrase; 

            iterator = 1;
            lastWhiteCardIndex = iterator;

            while (iterator <= 200){
                lastWhiteCard = await WhiteCard.findOne({WhiteCardID: iterator });
                if(lastWhiteCard !== null){
                    lastWhiteCardIndex = iterator+1;
                }                
                iterator ++;
            }      

            WhiteCardID = lastWhiteCardIndex;

            const whitecard = await WhiteCard.create({  
                WhiteCardPhrase,
                WhiteCardID,                                                                        
            });

            req.io.emit('New White Card', whitecard);

            return res.json({whitecard});
        }catch(error){
            console.log(error.message);            
        }  
    },        

    // DELETA A CARTA DE ACORDO COM O ID PASSADO NOS PARAMETRO DO URL
    async delete(req,res){
        try{
            const code = req.params.code;

            await WhiteCard.deleteOne({ WhiteCardID: code });

            return res.json({'status':'deleted'})        
        } catch(error){
            console.log(error.message)
        }
    },
    
    // FIND A CARTA DE ACORDO COM O ID PASSADO NOS PARAMETRO DO URL
    async findBlackCardByID(req, res){
        try{  
            const code = req.params.code;

            const whitecard = await WhiteCard.findOne({WhiteCardID: code});

            if (whitecard == null){
                return res.json({'status':'NAOACHOU'});
            } else if (blackcard != null){
                return res.json(whitecard);
            }
  
        }catch(error){
            console.log(error.message);
        }  
    },
    
};