import { engine } from 'express-handlebars'
import path from 'path'

const defaultPath =
  process.env.NODE_ENV === 'production'
    ? '../views/layouts'
    : '../../views/layouts'

export const hbsConfig = engine({
  extname: '.hbs',
  defaultLayout: path.join(__dirname, defaultPath, '/main.hbs'),
  layoutsDir: path.join(__dirname, defaultPath)
})
