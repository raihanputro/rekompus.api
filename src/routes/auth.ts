import { Router } from "express"
import { celebrate, Joi } from 'celebrate'

const router  = Router()

router.post(
  '/register',
  async (req, res, next) => {
    let { email, password } = req.body
    res.json({ status: 'register', body: email + ' --- ' + password });
  }
)

router.post(
  '/login',
  celebrate({
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),  
  async (req, res, next) => {
    let { email, password } = req.body
    try {
      return res.json({ status: 1, body: email + ' --- ' + password });
    } catch (e) {
      return next(e);
    }    
  }
)

router.post(
  '/logout',
  async (req, res, next) => {
    res.json({ status: '1', message: '' });
  }
)

export default router