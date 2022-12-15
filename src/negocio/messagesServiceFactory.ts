import MessagesService from './MessagesService'
import MessagesRepository from './MessagesRepository'
import MessagesDAO from './MessagesDAO'

const repository = new MessagesRepository(new MessagesDAO())
export const messagesService = new MessagesService(repository)
