const dateHelper = require('../date-helper/date');

class UserDto {
     constructor(user) {
          this.id = user.id
          this.name = user.name
          this.surname = user.surname
          this.login = user.login
          this.password = user.password
          this.permission = user.permission
          this.subordinate = user.subordinate
          this.createdAt = dateHelper(user.createdAt)
          this.updatedAt = dateHelper(user.updatedAt)
     }
}

module.exports= UserDto;