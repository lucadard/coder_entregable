import { Schema } from 'mongoose'
import { Product as ProductType, DAOType } from '../../types'
import DAOMemory from '../memory/BaseDAO'
import DAOMongo from '../mongodb/BaseDAO'

const selectedDAO = process.env.SELECTED_DAO || 'mongodb'

const productsSchema = new Schema<ProductType>({
  id: { type: String, required: true },
  code: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  timestamp: { type: Number, required: true },
  photo_url: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true }
})

let dao: DAOType<ProductType>

switch (selectedDAO) {
  case 'mongodb':
    dao = new DAOMongo('products', productsSchema)
    break
  default:
    dao = new DAOMemory()
}

export default class ProductsDAOFactory {
  static getDao() {
    return dao
  }
}
