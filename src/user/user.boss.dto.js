const dateHelper = require('../date-helper/date');

class BossDto {
    constructor(boss) {
        this.id = boss.id
        this.name = boss.name
        this.surname = boss.surname
        this.login = boss.login
        this.password = boss.password
        this.permission = boss.permission
        this.subordinate = boss.subordinate
        this.createdAt = dateHelper(boss.createdAt)
        this.updatedAt = dateHelper(boss.updatedAt)
    }
}

module.exports= BossDto;