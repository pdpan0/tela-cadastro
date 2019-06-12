var express = require('express');
var router = express.Router();
var banco = require('../app-banco');

router.post('/enviar', function (req, res, next) {

    console.log(req.body);
    res.status(200);

})