import CartsDAOFactory from './factories/CartsDAOFactory'
import ProductsDAOFactory from './factories/ProductsDAOFactory'
import UsersDAOFactory from './factories/UsersDAOFactory'
import MessagesDAOFactory from './factories/MessagesDAOFactory'

export const messagesDAO = MessagesDAOFactory.getDao()
export const productsDAO = ProductsDAOFactory.getDao()
export const cartsDAO = CartsDAOFactory.getDao()
export const usersDAO = UsersDAOFactory.getDao()
