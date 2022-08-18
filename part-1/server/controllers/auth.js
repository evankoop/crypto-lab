const bcrypt = require('bcrypt')
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
          const authenticated = bcrypt.compare(password, users[i], passwordHash)
          if (authenticated) {
            let userToReturn = {...users[i]}
            res.status(200).send(userToReturn)
          }
        }
      }

      res.status(400).send("User not found.")
    },
    register: (req, res) => {
      const { username, email, firstName, lastName, password } = req.body
        const saltRounds = 10
        bcrypt.hash(password, saltRounds, (err, passwordHash) => {
        let user = {
          username,
          email,
          firstName,
          lastName,
          passwordHash
        }
        users.push(user)
        let userToReturn = {...user}
        delete userToReturn.passwordHash
        res.status(200).send(userToReturn)
      })
  }
}