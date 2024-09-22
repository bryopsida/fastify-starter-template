import * as argon2 from 'argon2'
export class AuthNService {
  #userService
  constructor (userService) {
    this.#userService = userService
  }

  async #verifyPassword (plaintextPassword, hashedPassword) {
    return await argon2.verify(hashedPassword, plaintextPassword)
  }

  async verifyUser (username, password) {
    const user = await this.#userService.getUserByUsername(username)
    if (!user) {
      throw new Error('User not found')
    }
    if (!await this.#verifyPassword(password, user.password)) {
      throw new Error('Invalid password')
    }
    return {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.Role.role
    }
  }
}
