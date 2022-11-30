import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') dotenv.config()

const MONGO_URL = process.env.MONGO_URL!

export default {
  fileSys: {
    path: './files'
  },
  mongodb: {
    url: MONGO_URL,
    options: {
      retryWrites: true
    }
  }
}
