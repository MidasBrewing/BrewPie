const ip = require("ip");

const secs = secs => {
  return secs * 1000;
};
const mins = mins => {
  return mins * secs(60);
};
const getIp = () => {
  return ip.address();
};
const now = () => {
  const date = new Date();
  return date.toISOString();
};

module.exports = {
  secs: secs,
  mins: mins,
  getIp: getIp,
  now: now
};
