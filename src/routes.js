const express = require('express')
const multer = require('multer');
const routes = new express.Router();
const upload = multer();

/* IMPORT DOS CONTROLLERS */
const UserController = require('./controllers/UserController');
const BlackCardController = require('./controllers/BlackCardController');
const WhiteCardController = require('./controllers/WhiteCardController');

// USER REST CALL's
routes.get('/user', UserController.index);
routes.post('/user/login', upload.single(), UserController.login);
routes.post('/user/delete', upload.single(), UserController.delete);
routes.post('/user', upload.single(), UserController.store);

// BLACKCARD REST CALL's
routes.get('/bcards', BlackCardController.index);
routes.post('/bcards/new', upload.single(), BlackCardController.store);
routes.post('/bcards/find/:code', upload.single(), BlackCardController.findBlackCardByID);
routes.post('/bcards/delete/:code', upload.single(), BlackCardController.delete);

// WHITECARD REST CALL's
routes.get('/wcards', WhiteCardController.index);
routes.post('/wcards/new', upload.single(), WhiteCardController.store);
routes.post('/wcards/find/:code', upload.single(), WhiteCardController.findBlackCardByID);
routes.post('/wcards/delete/:code', upload.single(), WhiteCardController.delete);


/*
// SOCKET
routes.post("/new-message", (req, res) => {
    // You can do validation or database stuff before emiting
    req.io.emit("new-message", { content: req.body.content });
    return res.send({ success: true });
  });
   */
  

module.exports = routes;
