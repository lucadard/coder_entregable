import { Schema } from 'mongoose'
import { User as UserType, DAOType } from '../../types'
import DAOMemory from '../memory/BaseDAO'
import DAOMongo from '../mongodb/BaseDAO'

const selectedDAO = process.env.SELECTED_DAO || 'mongodb'

const usersSchema = new Schema<UserType>({
  id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true }
})

let dao: DAOType<UserType>

switch (selectedDAO) {
  case 'mongodb':
    dao = new DAOMongo('users', usersSchema)
    break
  default:
    dao = new DAOMemory()
}

export default class UsersDAOFactory {
  static getDao() {
    return dao
  }
}
