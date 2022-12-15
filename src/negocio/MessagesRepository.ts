import Message from './Message'
import MessagesDAO from './MessagesDAO'

export default class MessagesRepository {
  private dao: MessagesDAO
  constructor(dao: MessagesDAO) {
    this.dao = dao
  }

  async save(message: Message) {
    await this.dao.addOne(message.asDto())
  }

  async getAll() {
    const dtos = await this.dao.getAll()
    return dtos.map((msgDto) => new Message(msgDto))
  }

  async getById(id: string) {
    const dto = await this.dao.findById(id)
    if (dto === undefined) throw new Error('No message found')
    return new Message(dto)
  }
}
