const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const { getChild, getChildProfile } = require('./child');

app.use(bodyParser.json());
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('Hello world :)');
});

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
