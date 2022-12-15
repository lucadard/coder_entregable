import { Message as MessageType } from '../types'

function isValid(message: MessageType): void {
  //haria chequeos de validacion si fuera necesario
}

export default class Message {
  private _id: MessageType['id']
  private _sender_id: MessageType['sender_id']
  private _receiver_id: MessageType['receiver_id']
  private _timestamp: MessageType['timestamp']
  private _content: MessageType['content']

  constructor(message: MessageType) {
    isValid(message)
    this._id = message.id
    this._sender_id = message.sender_id
    this._receiver_id = message.receiver_id
    this._timestamp = message.timestamp
    this._content = message.content
  }

  get id() {
    return this._id
  }
  get sender_id() {
    return this._sender_id
  }
  get receiver_id() {
    return this._receiver_id
  }
  get timestamp() {
    return this._timestamp
  }
  get content() {
    return this._content
  }

  public asDto = (): Readonly<MessageType> =>
    Object.freeze({
      id: this.id,
      sender_id: this.sender_id,
      receiver_id: this.receiver_id,
      timestamp: this.timestamp,
      content: this.content
    })
}
