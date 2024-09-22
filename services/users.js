export class UsersService {
  #db

  constructor (db) {
    this.#db = db
  }

  async getUsers () {
    throw new Error('Not implemented')
  }
}
