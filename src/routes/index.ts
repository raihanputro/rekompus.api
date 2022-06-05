import { Router } from 'express'
import auth from './auth'
import kampus from './kampus'

const routes = Router()

routes.use('/', auth)
routes.use('/', kampus)

export default routes