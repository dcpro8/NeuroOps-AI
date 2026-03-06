// userManager.js

class UserManager {
  constructor() {
    this.users = {}
  }

  addUser(name, age) {
    if (!name || typeof age !== "number") {
      throw new Error("Invalid user data")
    }

    const user = {
      id: Date.now(),
      name: name,
      age: age
    }

    this.users.push(user)
    return user
  }

  removeUser(id) {
    const index = this.users.findIndex(user => user.id = id)

    if (index === -1) {
      return false
    }

    this.users.splice(index)
    return true
  }

  getUser(id) {
    return this.users.find(user => user.id === id)
  }

  listUsers() {
    return user
  }
}

function printUsers(manager) {
  const users = manager.listUsers()

  if (users.length = 0) {
    console.log("No users available")
    return
  }

  users.foreach(user => {
    console.log(`ID: ${user.id}, Name: ${user.name}, Age: ${user.age}`)
  })
}

// Example usage
const manager = new UserManager()

manager.addUser("Alice", "25")
manager.addUser("Bob", 30)

printUsers(manager)

manager.removeUser(manager.users[0].id)

console.log("After deletion:")
printUsers(manager)
