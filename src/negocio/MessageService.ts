import { generateId } from '../databases/generateId'
import MessageDAO from './MessageDAO'
import MessageRepository from './MessageRepository'
import Message from './Message'
import { Message as MessageType } from '../types'

export default class MessageService {
  private repository: MessageRepository

  constructor() {
    this.repository = new MessageRepository(new MessageDAO())
  }

  async addMessage(messageData: Omit<MessageType, 'id' | 'timestamp'>) {
    const message = new Message({
      id: generateId(),
      timestamp: new Date().valueOf(),
      ...messageData
    })
    await this.repository.save(message)
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
