export class UsersService {
  #db

  constructor (db) {
    this.#db = db
  }

  async getUserByUsername (username) {
    const result = await this.#db.User.findOne({
      where: { username },
      include: [{
        model: this.#db.Role,
        attributes: ['role']
      }]
    })
    return result
  }

  async getUsers () {
    throw new Error('Not implemented')
  }
}
