import { Router } from 'express'
import { authJwt } from "../middlewares";
const router = Router()

import * as productController from '../controllers/products.controller'

router.post('/', [authJwt.verifyToken, authJwt.isAdmin, authJwt.isModerator], productController.createProduct)

router.get('/', productController.getProducts)

router.get('/:productId', productController.getProductById)

router.put('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productController.updateProductById)

router.delete('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productController.deleteProductById)

export default router;