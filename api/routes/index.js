const bodyParser = require('body-parser');
const pessoas = require('./pessosRoute');

module.exports = app => {
    app.use(bodyParser.json());
    app.use(pessoas);
}
