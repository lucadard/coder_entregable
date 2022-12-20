import { Schema } from 'mongoose'

import BaseDAO from '../mongodb/BaseDAO'
import { Message as MessageType } from '../../types'

const messageSchema = new Schema<MessageType>({
  id: { type: String, required: true },
  receiver_id: { type: String, required: true },
  sender_id: { type: String, required: true },
  timestamp: { type: Number, required: true },
  content: { type: String, required: true }
})

let dao = new BaseDAO('messages', messageSchema)

export default class MessageDAOFactory {
  static getDao() {
    return dao
  }
}
