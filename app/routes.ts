import * as Express from 'express'
import * as ProductController from './controllers/product_controller'
import * as CartController from './controllers/cart_controller'
import * as CheckoutController from './controllers/checkout_controller'
import * as UserController from './controllers/user_controller'

export function setupRoutes(app: Express.Express): void {
  app.get('/product/:id', ProductController.getByIdHandler)
  app.post('/product', ProductController.postHandler)
  app.get('/products', ProductController.getAllHandler)
  app.delete('/product/:id', ProductController.deleteHandler)

  app.post('/cart', CartController.post)
  app.put('/cart/:cartId/product/:productId', CartController.addItemHandler)
  app.delete('/cart/:cartId/product/:productId', CartController.removeItemHandler)

  app.get('/checkout/:cartId', CheckoutController.getByCartIdHandler)

  app.post('/login', UserController.LoginHandler)
}
