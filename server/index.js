const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const { sendWish } = require('./child');
const { startMailer } = require('./mailer');

app.use(bodyParser.json());
app.use(morgan('tiny'));

app.post('/wish', sendWish);

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
  startMailer();
});
