import { Router } from 'express'
import auth from './auth'
import kampus from './kampus'
import favorite from './favorite'

const routes = Router()

routes.use('/', auth)
routes.use('/', kampus)
routes.use('/', favorite)

export default routes