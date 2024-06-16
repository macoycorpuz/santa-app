const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const { getChild, getChildProfile } = require('./child');

app.use(bodyParser.json());
app.use(morgan('tiny'));

app.post('/wish', async (req, res) => {
  const { username, wish } = req.body;

  const child = await getChild(username);
  if (!child?.uid) {
    return res.status(404).json({ message: 'Child not found' });
  }

  const childProfile = await getChildProfile(child.uid);
  if (!childProfile?.userUid) {
    return res.status(404).json({ message: 'Child not found' });
  }

  res.json({ wish, child });
});

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
