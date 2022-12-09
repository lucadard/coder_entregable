import { Message as MessageType } from '../types'

function isValid(message: MessageType): MessageType {
  //haria chequeos de validacion si fuera necesario
  return message
}

export default class Message {
  private id: MessageType['id']
  private sender_id: MessageType['sender_id']
  private receiver_id: MessageType['receiver_id']
  private timestamp: MessageType['timestamp']
  private content: MessageType['content']

  constructor(message: MessageType) {
    isValid(message)
    this.id = message.id
    this.sender_id = message.sender_id
    this.receiver_id = message.receiver_id
    this.timestamp = message.timestamp
    this.content = message.content
  }

  getMessageId = () => this.id
  getSenderId = () => this.sender_id
  getReceiverId = () => this.receiver_id
  getTimestamp = () => this.timestamp
  getMessageContent = () => this.content

  asDto = (): Readonly<MessageType> =>
    Object.freeze({
      id: this.id,
      sender_id: this.sender_id,
      receiver_id: this.receiver_id,
      timestamp: this.timestamp,
      content: this.content
    })
}
