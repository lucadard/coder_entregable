import { buildSchema } from 'graphql'
import { graphqlHTTP } from 'express-graphql'

import { graphql as productsGQL } from '../controllers/productController'
import { graphql as cartsGQL } from '../controllers/cartController'
import { graphql as messagesGQL } from '../controllers/messagesController'

const schema = buildSchema(`
  input ProductInput {
    code: String!
    name: String!
    description: String
    photo_url: String
    price: Int!
    stock: Int!
  }
  type Product {
    id: ID
    timestamp: String
    code: String
    name: String
    description: String
    photo_url: String
    price: Int
    stock: Int
  }
  input MessageInput {
    sender_id: ID!
    receiver_id: ID!
    content: String!
  }
  type Message {
    id: ID
    timestamp: String
    sender_id: ID
    receiver_id: ID
    content: String
  }
  type ProductInCart {
    product_id: ID
    amount: Int
  }
  type Cart {
    id: ID
    user_id: String
    timestamp: String
    products: [ProductInCart]
  }
  type Query {
    getProduct(id: ID!): Product
    getAllProducts: [Product]

    getMessage(id:ID!): Message
    getAllMessages: [Message]

    getProductsInCart(user_id: ID!): [ProductInCart]

  }
  type Mutation {
    createProduct(data: ProductInput!): Product
    updateProduct(id: ID!, data: ProductInput!): Product
    removeProduct(id: ID!): Product

    createMessage(data: MessageInput!): Message
    
    addProductToCart(amount: Int!, product_id: ID!, user_id: ID!): Cart
    removeOneProductFromCart(user_id: ID!, product_id: ID!, removeAll: Boolean!): Cart
    removeAllProductsFromCart(user_id: ID!): Cart
  }
`)

export const graphqlMiddleware = graphqlHTTP({
  schema,
  rootValue: {
    getProduct: productsGQL.getProductById,
    getAllProducts: productsGQL.getAllProducts,
    createProduct: productsGQL.addProduct,
    updateProduct: productsGQL.updateProductById,
    removeProduct: productsGQL.removeProductById,

    getMessage: messagesGQL.getMessageById,
    getAllMessages: messagesGQL.getAllMessages,
    createMessage: messagesGQL.addMessage,

    getProductsInCart: cartsGQL.getProductsInCart,
    addProductToCart: cartsGQL.addProductToCart,
    removeOneProductFromCart: cartsGQL.removeOneProductFromCart,
    removeAllProductsFromCart: cartsGQL.removeAllProductsFromCart
  },
  graphiql: true
})
