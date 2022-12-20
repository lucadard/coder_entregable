import { Request, Response } from 'express'
import { productsService, cartsService } from '../services'

export const get = {
  renderNotFoundPage: (req: Request, res: Response) => {
    return res.status(404).render('404', { title: 'Pagina no encontrada' })
  },
  renderHomePage: async (req: Request, res: Response) => {
    const products = (await productsService.getAllProducts()) || []
    return res.render('index', { user: req.user, products, title: 'Inicio' })
  },
  renderUserCart: async (req: any, res: Response) => {
    if (!req.user) throw new Error('No user found.')
    const { cartProducts, totalPrice } = await cartsService.getCartDetails(
      req.user.id
    )
    return res.render('cart', {
      user: req.user,
      cartProducts,
      price: totalPrice,
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
    const product = await productsService.getProductById(id as string)
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
