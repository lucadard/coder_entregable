import mongoose, { Schema } from 'mongoose'
import { logger } from '../../config/logger'
import { DAOType, HasId } from '../../types'

import config from '../config'

export default class BaseDAO<T extends HasId> implements DAOType<T> {
  protected collectionName
  protected collection

  constructor(collectionName: string, schema: Schema<T>) {
    this.collection = mongoose.model(collectionName, schema)
    this.collectionName = collectionName
    this.connect()
  }

  connect = async () => {
    mongoose.connection.on('connected', () =>
      logger.info(`Mongodb: ${this.collectionName} collection connected`)
    )
    mongoose.connection.on('error', (err) =>
      logger.error(
        `Mongodb: Could not connect to ${this.collectionName} collection`
      )
    )

    await mongoose.connect(config.mongodb.url, config.mongodb.options)
  }

  getAll = async () => {
    const items: T[] = await this.collection
      .find()
      .select({ _id: 0, __v: 0 })
      .lean()
    return items
  }

  findById = async (id: string) => {
    const item: T = await this.collection
      .findOne({ id })
      .select({ _id: 0, __v: 0 })
      .lean()
    return item
  }

  findByQuery = async (query: Object) => {
    const item: T = await this.collection
      .findOne(query)
      .select({ _id: 0, __v: 0 })
      .lean()
    return item
  }

  addOne = async (item: T) => {
    const newItem = new this.collection<T>(item)
    await newItem.save()
    return newItem as T
  }

  updateById = async (id: string, data: T) => {
    const updatedItem = await this.collection
      .findOneAndUpdate({ id }, { $set: { ...data } }, { new: true })
      .select({ _id: 0, __v: 0 })
      .lean()
    return updatedItem
  }
  updateByQuery = async (query: Object, data: T) => {
    const updatedItem = await this.collection
      .findOneAndUpdate(
        query,
        {
          $set: { ...data }
        },
        { new: true }
      )
      .select({ _id: 0, __v: 0 })
      .lean()
    return updatedItem
  }

  deleteOne = async (id: string) => {
    const deletedItem = await this.collection
      .findOneAndDelete({ id })
      .select({ _id: 0, __v: 0 })
      .lean()
    return deletedItem
  }

  deleteAll = async () => {
    return await this.collection.deleteMany({})
  }

  count = async () => {
    return await this.collection.count({})
  }
}
