import { Schema } from 'mongoose'
import ContenedorMongoDB from '../databases/mongodb/ContenedorMongoDB'

import { Message as MessageType } from '../types'

const messageSchema = new Schema<MessageType>({
  id: { type: String, required: true },
  receiver_id: { type: String, required: true },
  sender_id: { type: String, required: true },
  timestamp: { type: Number, required: true },
  content: { type: String, required: true }
})

export default class MessageDAO extends ContenedorMongoDB<MessageType> {
  constructor() {
    super('messages', messageSchema)
  }
}
