const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.get('/teste', (req, res) => {
res.status(200).send({mensagem: 'Boas Vindas á API'})
})

app.listen(port,()=>{
    console.log(`Servidor rodando na porta http://localhost:${port}`)
})

