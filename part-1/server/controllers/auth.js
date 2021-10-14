const bcrypt = require("bcryptjs")
const users = [];

module.exports = {
  login: (req, res) => {
    console.log('Logging In User')
    console.log(req.body);
    const { username, password } = req.body

    for (let i = 0; i < users.length; i++) {
        //if (users[i].username === username && user[i].password === password)
        const existing = bcrypt.compareSync(password, users[i].passwordHash)

        if (existing) {
        //users[i].password.push(password)

          let usersToReturn = { ...users[i] }

          delete usersToReturn.passwordHash

          res.status(200).send(users[i])


        }else{
          res.status(400).send("User not found.")
      }
    }
  },
  register: (req, res) => {
    const { username, email, firstName, lastName, password } = req.body
    const salt = bcrypt.genSaltSync(5)
    const passwordHash = bcrypt.hashSync(password, salt)
    console.log(password, passwordHash)

    let user = {
      username,
      firstName,
      email,
      lastName,
      passwordHash
    };
    console.log("Registering User");
    console.log(user);
    users.push(user);
    //let userToReturn = { ...users }
    //delete userToReturn.passwordHash
    res.status(200).send(req.body);
  }
}
