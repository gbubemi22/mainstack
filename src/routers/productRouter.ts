import express from "express";
import ProductController from "../controllers/productController";
import verifyToken from "../middleware/auth";
const router = express.Router();


router.use('/', verifyToken);
router.use('/:id', verifyToken);

router.route("/").post(ProductController.addProduct);

router.route("/").get(ProductController.getAllProduct);

router.route("/:id").get(ProductController.getOneProduct);

router.route("/:id").delete(ProductController.deleteProduct);

router.route("/:id").patch(ProductController.updateProduct);

export default router;
