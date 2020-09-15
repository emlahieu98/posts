const DB = require("./classDB");
const db = new DB();
class User {
  async create(first) {
    const res = await db.user(first);
    return res;
  }

  async get(filter, matches) {
    const res = await db.user(filter, matches);
    if (res[0] !== undefined) {
      return res;
    } else {
      return false;
    }
  }
  async set(filter, updater) {
    const res = await db.user(filter, updater);
    return res;
  }
  async del(filter) {
    await db.User.deleteOne(filter);
    return;
  }
}
var user = new User();

module.exports = {
  user: user,
};
