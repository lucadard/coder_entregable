import { engine } from 'express-handlebars'

export const hbsConfig = engine({
  extname: '.hbs',
  layoutsDir: './views/layouts'
})
