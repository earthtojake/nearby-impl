const request = require('request-promise');
const {UserModel, GroupModel} = require('./model');

function alphanum(n) {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyz";
  let result = '';
  for (var i = n; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

function randint(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randprop(obj) {
  var result;
  var count = 0;
  for (var prop in obj)
      if (Math.random() < 1/++count)
         result = prop;
  return result;
}

const seed = () => {

  UserModel.deleteMany({}).then((res) => {
    GroupModel.deleteMany({}).then((res) => {
      request('https://randomuser.me/api/?results=300')
        .then(res => JSON.parse(res))
        .then(async (res) => {

          // users
          let users = res.results.map((r) => {
            const user = {};
            user.name = `${r.name.first} ${r.name.last}`;
            user.picture = r.picture.large;
            const fullUser = new UserModel(user);
            return fullUser;
          });

          let groups = [];
          let j = 0;
          while (j < users.length) {

            const group = new GroupModel({
              title: "Hello World",
            });

            const user_ids = [];
            for (let i = 0; i < randint(2,30) && j < users.length; i++) {
              const user = users[j];
              user.group_id = group._id;
              user_ids.push(user._id);
              j++;
            }

            group.user_ids = user_ids;
            group.size = user_ids.length;
            groups.push(group);

          }

          users.forEach(user => {
            user.save();
          });

          groups.forEach(group => {
            group.save();
          });

        })
        .catch((err) => {
          console.log('err:', err);
        });
    })
  });
};

module.exports = seed;
