import Generic from '../models/Generic'
import { DAOType, Message as MessageType } from '../types'

export default class MessagesRepository {
  private dao
  constructor(dao: DAOType<MessageType>) {
    this.dao = dao
  }

  async save(message: Generic<MessageType>) {
    return await this.dao.addOne(message.asDto())
  }

  async getAll() {
    const dtos = await this.dao.getAll()
    return dtos.map((msgDto) => new Generic(msgDto))
  }

  async getById(id: string) {
    const dto = await this.dao.findById(id)
    if (dto === undefined) throw new Error('No message found')
    return new Generic(dto)
  }
}
