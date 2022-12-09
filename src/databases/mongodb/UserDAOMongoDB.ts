import { Schema } from 'mongoose'
import ContenedorMongoDB from './ContenedorMongoDB'

import { User } from '../../types'
import { generateId } from '../generateId'

/*_________________bCrypt functions_________________*/
import bcrypt from 'bcrypt'
function isValidPassword(user: User, password: string) {
  return bcrypt.compareSync(password, user.password)
}
function createHash(password: string) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}
/*_________________________________________________*/

const userSchema = new Schema<User>({
  id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true }
})

export default class UserDAO extends ContenedorMongoDB<User> {
  constructor() {
    super('users', userSchema)
  }

  register = async ({ username, password }: any) => {
    if (await this.findByUsername(username))
      throw new Error('User already exists')
    const newUser = new this.collection<User>({
      id: generateId(),
      admin: false,
      username,
      password: createHash(password)
    })
    try {
      await newUser.save()
      return newUser
    } catch (err: any) {
      throw new Error(err)
    }
  }

  authenticate = async (userCredentials: any) => {
    const user = await this.findByUsername(userCredentials.username)
    if (!user) throw new Error('User does not exist')
    if (!isValidPassword(user, userCredentials.password))
      throw new Error('Invalid password')
    return user
  }

  findByUsername = async (username: string): Promise<User> => {
    try {
      const user: User = await this.collection
        .findOne({ username })
        .select({ _id: 0, __v: 0 })
        .lean()
      return user
    } catch (err: any) {
      throw new Error(err)
    }
  }
  isAdmin = async (user_id: string) => {
    try {
      const user = await this.findById(user_id)
      if (!user) throw new Error('User does not exist')
      return user.admin
    } catch (err: any) {
      throw new Error(err)
    }
  }
}
