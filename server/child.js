const axios = require('axios');
const instance = axios.create({
  baseURL: 'https://raw.githubusercontent.com/alj-devops/santa-data/master',
});

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

const getChildAge = (birthdate) => {
  const today = new Date();
  const birthDate = new Date(birthdate);
  const age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

module.exports = { getChild, getChildProfile, getChildAge };
