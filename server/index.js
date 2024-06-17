const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { sendWish } = require('./child');
const { startMailer } = require('./mailer');

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());

app.post('/wish', sendWish);

const listener = app.listen(process.env.PORT || 8080, function () {
  console.log('Server is listening on port ' + listener.address().port);
  startMailer();
});
