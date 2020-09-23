const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

app.use(bodyParser.json());

var con = mysql.createConnection({
    host: "db",
    user: "root",
    password: "root"
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("##Successfully connected to MySQL container##");
  });

app.get('/', (req, res) => {
    res.json('Hello World')
})

app.listen(9000, () => console.log('Server ativo na porta 9000'));