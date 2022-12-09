import CartDAOFactory from './CartDAOFactory'
import ProductDAOFactory from './ProductDAOFactory'
import UserDAOFactory from './UserDAOFactory'
import MessageDAOFactory from './MessageDAOFactory'

export const productDAO = ProductDAOFactory.getDao()
export const cartDAO = CartDAOFactory.getDao()
export const userDAO = UserDAOFactory.getDao()
export const messageDAO = MessageDAOFactory.getDao()
