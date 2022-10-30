var pool = require("./bd");
var md5 = require("md5");

async function getUserByUsernameAndPassword(user, password) {
  try {
    var query =
      "select * from usuarios where usuario = ? and password = ? limit 1"; //limit 1 hace que solo traiga un resultado
    var rows = await pool.query(query, [user, md5(password)]);
    return rows[0]; //la query devuelve un array y yo me quedo con el primero
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getUserByUsernameAndPassword };
