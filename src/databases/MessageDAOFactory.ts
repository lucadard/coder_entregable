import MessageDAO from '../negocio/MessagesDAO'

let dao = new MessageDAO()

export default class MessageDAOFactory {
  static getDao() {
    return dao
  }
}
