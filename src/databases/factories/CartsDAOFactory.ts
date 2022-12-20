import { Schema } from 'mongoose'
import { Cart as CartType, DAOType } from '../../types'
import DAOMemory from '../memory/BaseDAO'
import DAOMongo from '../mongodb/BaseDAO'

const selectedDAO = process.env.SELECTED_DAO || 'mongodb'

const cartsSchema = new Schema<CartType>({
  id: { type: String, required: true },
  user_id: { type: String, required: true },
  timestamp: { type: Number, required: true },
  products: { type: [{ product_id: String, amount: Number }], required: true }
})

let dao: DAOType<CartType>

switch (selectedDAO) {
  case 'mongodb':
    dao = new DAOMongo('carts', cartsSchema)
    break
  default:
    dao = new DAOMemory()
}

export default class CartDAOFactory {
  static getDao() {
    return dao
  }
}
