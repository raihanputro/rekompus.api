import { Router } from "express"
import { celebrate, Joi } from 'celebrate'
// import jwt from "jsonwebtoken"
import multer from 'multer'
import { expressjwt } from "express-jwt"

import { Kampus } from '../entity/Kampus'

const router  = Router()
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg')
  }
})
const upload = multer({ storage: storage })
const authRequired = expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] })

router.get(
  '/kampus',
  authRequired,
  async (req, res, next) => {
    try {
      const kampus = await Kampus.find({relations: {
        jurusan: true        
      }})

      return res.json({ status: 1, data: kampus })
    } catch (e) {
      return next(e)
    }    
  }
)

router.get(
  '/kampus/:id',
  authRequired,
  async (req, res, next) => {
    const kampusId = req.params.id
    try {
      const kampus = await Kampus.find({
        relations: {
          jurusan: true,
        },
        where: {
          id: kampusId
        }
      })

      return res.json({ status: 1, data: kampus })
    } catch (e) {
      return next(e)
    }    
  }
)

router.post(
  '/kampus',
  [
    authRequired,
    /* celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        city: Joi.string().required(),
        alamat: Joi.string().required(),
        telepon: Joi.string(),
        email: Joi.string(),
        tahunBerdiri: Joi.string(),
        linkPendaftaran: Joi.string(),
        jenisKampus: Joi.string(),
        akreditasiKampus: Joi.string().required(),
        statusPmb: Joi.string().required(),
        kelasTersedia: Joi.array().items(Joi.string()),
        jurusan: Joi.array().items(Joi.object({
          namaJurusan: Joi.string().required(),
          jenjang: Joi.string().required(),
          akreditasi: Joi.string().required(),
          kelas: Joi.array().items(Joi.object({
            name: Joi.string().required(),
            biayaSPP: Joi.number().required()
          }))  
        }))
      })
    }) */
  ],
  async (req, res, next) => {
    let {
      name,
      description,
      city,
      alamat,
      telepon,
      email,
      tahunBerdiri,
      linkPendaftaran,
      jenisKampus,
      akreditasiKampus,
      statusPmb,
      kelasTersedia,
      linkFb,
      linkIg,
      linkTwitter,
      jurusan
    } = req.body
    
    try {
      const kampus = new Kampus()
      kampus.name = name
      kampus.description = description
      kampus.city = city
      kampus.alamat = alamat
      kampus.telepon = telepon
      kampus.email = email
      kampus.tahunBerdiri = tahunBerdiri
      kampus.linkPendaftaran = linkPendaftaran
      kampus.linkFb = linkFb
      kampus.linkIg = linkIg
      kampus.linkTwitter = linkTwitter
      kampus.jenisKampus = jenisKampus
      kampus.akreditasiKampus = akreditasiKampus
      kampus.statusPmb = statusPmb
      kampus.kelasTersedia = kelasTersedia
      kampus.jurusan = jurusan
      await kampus.save()

      res.json({ status: 1, data: kampus })
    } catch (e) {
      return next(e)
    }
  }
)

router.put(
  '/kampus/:id',
  [
    authRequired,
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        city: Joi.string().required(),
        akreditasiKampus: Joi.string().required(),
        statusPmb: Joi.string().required(),
        kelasTersedia: Joi.array().items(Joi.string())
      }),
    })
  ],
  async (req, res, next) => {
    let { name, description, city, akreditasiKampus, statusPmb, kelasTersedia } = req.body
    
    try {
      const kampus = await Kampus.findOneBy({
        id: req.params.id
      })
 
      kampus.name = name
      kampus.description = description
      kampus.city = city
      kampus.akreditasiKampus = akreditasiKampus
      kampus.statusPmb = statusPmb
      kampus.kelasTersedia = kelasTersedia
      await kampus.save()

      res.json({ status: 1, data: kampus })
    } catch (e) {
      return next(e)
    }
  }
)

router.post(
  '/kampus/:id/pictureid',
  [
    authRequired, 
    upload.single('pictureid')
  ],
  async (req, res, next) => {
    
    try {
      const file = req.file.path
      console.log(file)
      if (!file) {
        res.json({ status: 0, message: "No File is selected." })
      }

      const kampus = await Kampus.findOneBy({
        id: req.params.id
      })

      kampus.pictureId = req.file.filename
      await kampus.save()

      res.json({ status: 1, data: file })
    } catch (e) {
      return next(e)
    }
  }
)

export default router