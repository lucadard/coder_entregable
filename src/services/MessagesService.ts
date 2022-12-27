import { randomUUID } from 'crypto'
import MessagesRepository from '../repositories/MessagesRepository'
import Generic from '../models/Generic'
import { Message as MessageType } from '../types'

export default class MessagesService {
  private repository: MessagesRepository

  constructor(repository: MessagesRepository) {
    this.repository = repository
  }

  async addMessage(messageData: Omit<MessageType, 'id' | 'timestamp'>) {
    const message = new Generic<MessageType>({
      id: randomUUID(),
      timestamp: new Date().valueOf(),
      ...messageData
    })
    return await this.repository.save(message)
  }

  async getAllMessages() {
    const messages = await this.repository.getAll()
    return messages.map((msg) => msg.asDto())
  }

  async getMessageById(id: string) {
    const message = await this.repository.getById(id)
    return message.asDto()
  }
}
