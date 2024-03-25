var express = require('express');
var server = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var apiRouter = require('./apiRoute').router;
var cors = require('cors');
const path = require('path')
const { exec } = require('child_process');
// create application/x-www-form-urlencoded parser
server.use(bodyParser.urlencoded({ extended:true }));
server.use(jsonParser);

const corsoptions = {
    origin : '*',
    Credential : true,
    // control-allow-Credential : true,
   optionsuccesstatus:200,
}
server.use(cors(corsoptions))


// Config route

server.get('/', function(req, res){
    res.setHeader('Content-Type','text/html');
    res.setHeader('FormData','text/html');
    res.status(200).send('</h1> Bonjour  </h1>');
});



// test prediction desease
server.post('/predict', (req, res) => {
    const belly=req.body.belly;
    const diarrhose=req.body.diarrhose;
    const depression=req.body.depression;
    const inputData =  ["belly_pain","diarrhoea","depression","internal_itching","sweating"];
  
    if (!inputData) {
      return res.status(400).json({ error: 'Data is required' });
    }
  
    // Appelez le script Python avec les données en tant qu'argument
    const command = `python diseasepred.py ${JSON.stringify(""+inputData+"")}`;
  
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('Prediction error:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      // const predictions = JSON.parse(stdout);
       console.log(stdout)
       res.json({ "success":"true" });
    });
  });

server.use('/api', apiRouter);
server.use(express.static('public'))
server.listen(5000, function(){
    console.log('server en écoute')
})
