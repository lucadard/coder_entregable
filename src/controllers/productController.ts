import { Request, Response } from 'express'

import { productsService } from '../services'

export const get = {
  getAllProducts: async (req: Request, res: Response) => {
    try {
      const products = await productsService.getAllProducts()
      res.send({ data: products })
    } catch (err) {
      res.status(404).send({ error: 'products not found' })
    }
  },

  getProductById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const product: any = await productsService.getProductById(id)
      res.status(200).send({ data: product })
    } catch (err) {
      res.status(404).send({ error: 'product not found' })
    }
  }
}

export const post = {
  addProduct: async (req: Request, res: Response) => {
    const { body } = req
    try {
      const newProduct = await productsService.addProduct(body)
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
    try {
      const updatedProduct = await productsService.updateProduct(id, body)
      res.status(200).send({ data: updatedProduct })
      // let newData: any = Object.entries(body)
      // newData = newData.reduce((acc: {}, [key, value]: any) => {
      //   if (!value) return acc
      //   return {
      //     ...acc,
      //     [key]: value
      //   }
      // }, {})

      // const updatedProduct = await productsDAO.updateProduct(id, newData)
    } catch (err) {
      res.status(404).send({ error: 'product not found' })
    }
  }
}

export const eliminate = {
  deleteProductById: async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const deletedProduct = await productsService.removeProduct(id)
      res.status(200).send({ data: deletedProduct })
    } catch (err) {
      res.status(404).send({ error: 'product not found' })
    }
  }
}
