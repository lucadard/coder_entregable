import { logger } from '../../config/logger'
import { DAOType, HasId } from '../../types'

export default class BaseDAO<T extends HasId> implements DAOType<T> {
  protected data: T[]

  constructor() {
    this.data = []
  }

  getAll = async () => {
    const items = this.data
    return items
  }

  findById = async (id: T['id']) => {
    const [item] = this.data.filter((d) => d.id === id)
    return item
  }

  addOne = async (newItem: T) => {
    this.data.push(newItem)
    return newItem
  }

  updateById = async (id: T['id'], data: T) => {
    const itemIndex = this.data.findIndex((d) => d.id === id)
    const dataCopy = [...this.data]
    dataCopy.splice(itemIndex, 1, data)
    return data
  }

  deleteOne = async (id: string) => {
    const itemIndex = this.data.findIndex((d) => d.id === id)
    const dataCopy = [...this.data]
    dataCopy.splice(itemIndex, 1)
    return id
  }

  deleteAll = async () => {
    this.data = []
  }

  count = async () => {
    return this.data.length
  }
}
