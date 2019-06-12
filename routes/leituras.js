// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!

router.post('/ranking', function (req, res, next) {
  user = JSON.stringify(req.body);
  console.log(user);
  
  banco.conectar().then(() => {
    console.log(`Chegou p/ cadastro: ${JSON.stringify(req.body)}`);
    user = req.body.user;
    score = req.body.s;
    banco.sql.query(`insert into rank (score, nick) values (${score}, '${user}')`).then(function() {
			console.log(`Cadastro criado com sucesso!`);
			//res.sendStatus(201); 
			// status 201 significa que algo foi criado no back-end, 
				// no caso, um registro de usuário ;)		
		}).catch(err => {

			var erro = `Erro no cadastro: ${err}`;
			console.error(erro);
			res.status(500).send(erro);

		}).finally(() => {
      banco.sql.close();
      banco.conectar().then(() => {
        return banco.sql.query(`
        select top 10 * from rank order by score desc
            `);
      }).then(consulta => {
        estatisticas = consulta.recordsets
        console.log(consulta.recordsets);
        
        res.send(estatisticas);
      }).catch(err => {
    
        var erro = `Erro na leitura dos últimos registros: ${err}`;
        console.error(erro);
        res.status(500).send(erro);
    
      }).finally(() => {
        banco.sql.close();
      });
		});
  
  })
  
})



// não mexa nesta linha!
module.exports = router;
