const { pendingWishes } = require('./data');

const axios = require('axios');
const instance = axios.create({
  baseURL: 'https://raw.githubusercontent.com/alj-devops/santa-data/master',
});

const CHILD_NOT_REGISTERED = 'Child is not registered';
const CHILD_AGE_LIMIT = 10;
const CHILD_AGE_LIMIT_MESSAGE = `Child should be ${CHILD_AGE_LIMIT} years old or younger`;

const getChild = async (username) => {
  const { data } = await instance.get('users.json');
  const child = data.find((child) => child.username === username);
  return child;
};

const getChildProfile = async (userUid) => {
  const { data } = await instance.get('userProfiles.json');
  const childProfile = data.find((child) => child.userUid === userUid);
  return childProfile;
};

const getChildAge = (date) => {
  const today = new Date();
  const birthdate = new Date(date);
  if (today.getDate() < birthdate.getDate()) {
    return -1;
  }

  const age = today.getFullYear() - birthdate.getFullYear();
  const month = today.getMonth() - birthdate.getMonth();
  if (month < 0) {
    return age - 1;
  }
  return age;
};

const sendWish = async (reqeust, response) => {
  const { userid, wish } = reqeust.body;

  const child = await getChild(userid);
  if (!child?.uid) {
    return response.status(404).json({ message: CHILD_NOT_REGISTERED });
  }

  const childProfile = await getChildProfile(child.uid);
  if (!childProfile?.userUid) {
    return response.status(404).json({ message: CHILD_NOT_REGISTERED });
  }

  const age = getChildAge(childProfile.birthdate);
  if (age > CHILD_AGE_LIMIT) {
    return response.status(400).json({ message: CHILD_AGE_LIMIT_MESSAGE });
  }

  // currently using in memory database. this should be moved to on-disk database
  pendingWishes.push({
    username: child.username,
    address: childProfile.address,
    wish,
  });

  response.json({ id: child.uid, isWishSent: true });
};

module.exports = { sendWish };
