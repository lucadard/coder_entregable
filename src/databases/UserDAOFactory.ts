import UserDAOMongoDB from './mongodb/UserDAOMongoDB'

const selectedDAO = process.env.SELECTED_DAO || 'mongodb'

let dao: any

switch (selectedDAO) {
  default:
    dao = new UserDAOMongoDB()
}

export default class UserDAOFactory {
  static getDao() {
    return dao
  }
}
