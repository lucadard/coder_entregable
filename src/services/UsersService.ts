import { randomUUID } from 'crypto'
import Generic from '../models/Generic'
import UsersRepository from '../repositories/UsersRepository'
import { User as UserType } from '../types'
import { cartsService } from '.'

/*_________________bCrypt functions_________________*/
import bcrypt from 'bcrypt'
function isValidPassword(
  user: Generic<UserType>,
  password: UserType['password']
) {
  return bcrypt.compareSync(password, user.get().password)
}
function createHash(password: string) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}
/*_________________________________________________*/

export default class UsersService {
  private repository: UsersRepository

  constructor(repository: UsersRepository) {
    this.repository = repository
  }
  findById = async (id: UserType['id']) => {
    const user = await this.repository.getById(id)
    return user.asDto()
  }
  isAdmin = async (id: UserType['id']) => {
    const user = await this.repository.getById(id)
    return user.asDto().admin
  }
  authenticate = async (
    username: UserType['username'],
    password: UserType['password']
  ) => {
    const user = await this.repository.getByUsername(username)
    if (!user.get()) throw new Error('User does not exists.')

    let userCart = await cartsService.getByUserId(user.get().id)
    if (!userCart) userCart = await cartsService.createCart(user.get().id)

    if (!isValidPassword(user, password)) throw new Error('Invalid password.')
    return user.asDto()
  }
  register = async (
    username: UserType['username'],
    password: UserType['password']
  ) => {
    const user = await this.repository.getByUsername(username)
    if (user.get()) throw new Error('User already exists.')

    const newUser = new Generic<UserType>({
      id: randomUUID(),
      admin: false,
      username,
      password: createHash(password)
    })
    await this.repository.save(newUser)
    await cartsService.createCart(newUser.get().id)
    return newUser.asDto()
  }
}
