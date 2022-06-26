import { Router } from "express"
import { celebrate, Joi } from 'celebrate'
import { User } from '../entity/User'
import * as jwt from "jsonwebtoken"
import { expressjwt } from "express-jwt"
const router  = Router()
const authRequired = expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] })

router.post(
  '/register',
  celebrate({
    body: Joi.object({
      email: Joi.string().required().email(),
      name: Joi.string().required(),
      password: Joi.string().required()
    }),
  }),  
  async (req, res, next) => {
    let { name, email, password } = req.body
    
    const user = new User()
    user.name = name
    user.email = email
    user.password= password
    await user.save()

    res.json({ status: 1, data: user });
  }
)

router.post(
  '/login',
  celebrate({
    body: Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),  
  async (req, res, next) => {
    let { email, password } = req.body

    try {
      const user = await User.findOneBy({ email: email });  

      if (!user) {
        res.json({ status: 0, message: 'Invalid email or password !' });
      }
  
      if (!user.checkIfPasswordMatch(password)) {
        res.json({ status: 0, message: 'Invalid email or password !' });
      }  

      const token = jwt.sign(
        { email: email }
        , process.env.JWT_SECRET
        , { expiresIn: process.env.JWT_EXPIRATION, algorithm: 'HS256' }
        );

      return res.json({ status: 1, data: token });
    } catch (e) {
      return next(e);
    }    
  }
)

router.post(
  '/logout',
  authRequired,
  async (req, res, next) => {
    const authHeader = req.headers["authorization"]
    jwt.sign(authHeader, "", { expiresIn: 1 } , (logout, err) => {
      if (logout) {
        res.json({ status: 1, message: '' });
      } else {
        res.send({msg:'Error'});
        res.json({ status: 0, message: err });
      }
    })
  }
)

router.get(
  '/me',
  authRequired,
  async (req, res, next) => {
    const authHeader = req.headers["authorization"].replace('Bearer ', '')
    const decoded = <any>jwt.verify(authHeader, process.env.JWT_SECRET)
    const user = await User.find(
      {
        select: ['id', 'name', 'email'],
        where: {
          email: decoded.email
        }
      })
    res.json({ status: 1, data: user });
  }
)

export default router
