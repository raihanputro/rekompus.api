import { Router } from 'express'
import auth from './auth'
import kampus from './kampus'
import favorite from './favorite'
import review from './review'

const routes = Router()

routes.use('/', auth)
routes.use('/', kampus)
routes.use('/', favorite)
routes.use('/', review)

export default routes