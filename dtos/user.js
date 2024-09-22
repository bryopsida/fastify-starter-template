export function toDTO (user) {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    role: user.Role.role
  }
}
export function fromDTO (user) {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    id: user.id,
    email: user.email,
    Role: {
      role: user.role
    }
  }
}
