import { Request, Response } from 'express'
import { productDAO } from '../databases'

export const get = {
  getAllProducts: async (req: Request, res: Response) => {
    const products = await productDAO.getAll()
    return res.send({ data: products })
  },
  getProductById: async (req: Request, res: Response) => {
    let { id } = req.params
    const product: any = await productDAO.findById(id)
    return product
      ? res.status(200).send({ data: product })
      : res.status(404).send({ error: 'product not found' })
  }
}

export const post = {
  addProduct: async (req: Request, res: Response) => {
    const { body } = req
    try {
      const newProduct = await productDAO.addOne(body)
      return res.send({ data: newProduct })
    } catch (err) {
      return res.send({ error: 'Failed to save product' })
    }
  }
}

export const update = {
  updateProductById: async (req: Request, res: Response) => {
    const { id } = req.params
    const { body } = req

    let newData: any = Object.entries(body)
    newData = newData.reduce((acc: {}, [key, value]: any) => {
      if (!value) return acc
      return {
        ...acc,
        [key]: value
      }
    }, {})

    const updatedProduct = await productDAO.updateProduct(id, newData)

    return updatedProduct
      ? res.status(200).send({ data: updatedProduct })
      : res.status(404).send({ error: 'product not found' })
  }
}

export const eliminate = {
  deleteProductById: async (req: Request, res: Response) => {
    const { id } = req.params
    const product: any = await productDAO.deleteOne(id)
    return product.deletedCount
      ? res.status(200).send({ data: product })
      : res.status(404).send({ error: 'product not found' })
  }
}
