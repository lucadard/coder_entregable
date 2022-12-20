import Generic from '../models/Generic'
import { DAOType, User as UserType } from '../types'

export default class UsersRepository {
  private dao
  constructor(dao: DAOType<UserType>) {
    this.dao = dao
  }

  async save(user: Generic<UserType>) {
    if (await this.dao.findById(user.asDto().id))
      throw new Error('User already exists!')
    const savedUser = await this.dao.addOne(user.asDto())
    return new Generic(savedUser)
  }

  async getAll() {
    const dtos = await this.dao.getAll()
    return dtos.map((msgDto) => new Generic(msgDto))
  }

  async getById(id: UserType['id']) {
    const dto = await this.dao.findById(id)
    if (dto === undefined) throw new Error('No user found')
    return new Generic(dto)
  }
  async getByUsername(username: UserType['username']) {
    const dto = await this.dao.findByQuery!({ username })
    if (dto === undefined) throw new Error('No user found')
    return new Generic(dto)
  }

  async updateById(id: UserType['id'], userData: Generic<UserType>) {
    const dto = await this.dao.updateById(id, userData.asDto())
    return new Generic(dto)
  }

  async removeById(id: UserType['id']) {
    const removedProduct = await this.dao.deleteOne(id)
    return removedProduct
  }
}
