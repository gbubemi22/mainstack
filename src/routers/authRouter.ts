import express from 'express';
import AuthController from '../controllers/authController';

const router = express.Router();



router
.route('/register')
.post(AuthController.createUser);


router
.route('/login')
.post(AuthController.login);







export default router;
