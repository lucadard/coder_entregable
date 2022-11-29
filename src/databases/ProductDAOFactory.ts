import ProductDAOMongoDB from './mongodb/ProductDAOMongoDB'
import ProductDAOMemory from './memory/ProductDAOMemoria'
import ProductDAOFile from './file/ProductDAOArchivo'

const selectedDAO = process.env.SELECTED_DAO || 'mongodb'

let dao: any

switch (selectedDAO) {
  case 'archivo':
    dao = new ProductDAOFile()
    break
  case 'mongodb':
    dao = new ProductDAOMongoDB()
    break
  default:
    dao = new ProductDAOMemory()
}

export default class ProductDAOFactory {
  static getDao() {
    return dao
  }
}
