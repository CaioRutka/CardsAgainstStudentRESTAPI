function random(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = {
    async getBlackCardByID() {
        const blackCardID = random(1, 50);        
        var whiteCardID = [];

        for (var i = 0; i<5;i++){
            x = random(1, 200);
            whiteCardID.push(x);
        }

        console.log(`Black Card: ${blackCardID}`);
        console.log(`White Cards: ${whiteCardID}`);

        /*
        blackCardID = 1;

        const response = await axios.post(
          `http://localhost:3000/bcards/find/1`,
        );
      
        const blackCardPhrase = response.data;
        console.log(blackCardPhrase);

        return blackCardPhrase;
        */
      },
    
};