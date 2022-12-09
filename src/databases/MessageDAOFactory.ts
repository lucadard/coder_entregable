import MessageDAO from '../negocio/MessageDAO'

let dao = new MessageDAO()

export default class MessageDAOFactory {
  static getDao() {
    return dao
  }
}
