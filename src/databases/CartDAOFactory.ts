import CartDAOMongoDB from './mongodb/CartDAOMongoDB'
import CartDAOMemory from './memory/CartDAOMemoria'
import CartDAOFile from './file/CartDAOArchivo'

const selectedDAO = process.env.SELECTED_DAO || 'mongodb'

let dao: any

/** Los DAOs difieren en ciertos metodos, no es recomendable usar otro que no sea mongodb **/
switch (selectedDAO) {
  case 'archivo':
    dao = new CartDAOFile()
    break
  case 'mongodb':
    dao = new CartDAOMongoDB()
    break
  default:
    dao = new CartDAOMemory()
}

export default class CartDAOFactory {
  static getDao() {
    return dao
  }
}
