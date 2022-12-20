import MessagesService from './MessagesService'
import MessagesRepository from '../repositories/MessagesRepository'
import MessageDAOFactory from '../databases/factories/MessagesDAOFactory'

const messagesRepository = new MessagesRepository(MessageDAOFactory.getDao())
export const messagesService = new MessagesService(messagesRepository)

/*******************************************************/

import ProductsService from './ProductsService'
import ProductsRepository from '../repositories/ProductsRepository'
import ProductsDAOFactory from '../databases/factories/ProductsDAOFactory'

export const productsRepository = new ProductsRepository(ProductsDAOFactory.getDao())
export const productsService = new ProductsService(productsRepository)

/*******************************************************/

import CartsService from './CartsService'
import CartsRepository from '../repositories/CartsRepository'
import CartsDAOFactory from '../databases/factories/CartsDAOFactory'

const cartsRepository = new CartsRepository(CartsDAOFactory.getDao())
export const cartsService = new CartsService(cartsRepository)

/*******************************************************/

import UsersService from './UsersService'
import UsersRepository from '../repositories/UsersRepository'
import UsersDAOFactory from '../databases/factories/UsersDAOFactory'

const usersRepository = new UsersRepository(UsersDAOFactory.getDao())
export const usersService = new UsersService(usersRepository)
