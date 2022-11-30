import { Request, Response } from 'express'
import { cartDAO, productDAO } from '../databases'

export const get = {
  renderNotFoundPage: (req: Request, res: Response) => {
    return res.status(404).render('404')
  },
  renderHomePage: async (req: Request, res: Response) => {
    const products = (await productDAO.getAll()) || []
    return res.render('index', { user: req.user, products, title: 'Inicio' })
  },
  renderUserCart: async (req: any, res: Response) => {
    let cartProducts: any = []
    let price = 0
    if (req.user) {
      const { products, totalPrice } = await cartDAO.getProductsDetailsByUserId(
        req.user.id
      )
      cartProducts = products
      price = totalPrice
    }
    return res.render('cart', {
      user: req.user,
      cartProducts,
      price,
      title: 'Carrito'
    })
  },
  renderAddProductPage: async (req: Request, res: Response) => {
    return res.render('add-product', {
      user: req.user,
      title: 'Agregar producto'
    })
  },
  renderUpdateProductPage: async (req: Request, res: Response) => {
    let { id } = req.query
    const product = await productDAO.findById(id as string)
    return res.render('edit-product', {
      user: req.user,
      product,
      title: `Editar ${product.name}`
    })
  },
  renderLoginPage: (req: Request, res: Response) => {
    return res.render('login', { title: 'Ingresá' })
  },
  renderRegisterPage: (req: Request, res: Response) => {
    return res.render('register', { title: 'Registrate' })
  }
}
