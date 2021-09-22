const dateHelper = require('../date-helper/date');

class AdminDto {
    constructor(admin) {
        this.id = admin.id
        this.name = admin.name
        this.surname = admin.surname
        this.login = admin.login
        this.password = admin.password
        this.permission = admin.permission
        this.createdAt = dateHelper(admin.createdAt)
        this.updatedAt = dateHelper(admin.updatedAt)
    }
}

module.exports = AdminDto;