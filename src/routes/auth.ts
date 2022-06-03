import { Router } from "express"
import { celebrate, Joi } from 'celebrate'
import { User } from '../entity/User'
import * as jwt from "jsonwebtoken"
import { expressjwt } from "express-jwt"

const router  = Router()

router.post(
  '/register',
  celebrate({
    body: Joi.object({
      username: Joi.string().required(),
      name: Joi.string().required(),
      password: Joi.string().required()
    }),
  }),  
  async (req, res, next) => {
    let { name, username, password } = req.body
    
    const user = new User()
    user.name = name
    user.username = username
    user.password= password
    await user.save()

    res.json({ status: 1, data: user });
  }
)

router.post(
  '/login',
  celebrate({
    body: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),  
  async (req, res, next) => {
    let { username, password } = req.body

    try {
      const user = await User.findOneBy({ username: username });  

      if (!user) {
        res.json({ status: 0, message: 'Invalid username or password !' });
      }
  
      if (!user.checkIfPasswordMatch(password)) {
        res.json({ status: 0, message: 'Invalid email or password !' });
      }  

      const token = jwt.sign(
        { username: username }
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
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
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

export default router
