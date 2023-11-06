import { Router } from 'express';

import AuthRouter from './authRouter'
import ProductRouter from './productRouter';

const router = Router();


router.use('/api/v1/auth', AuthRouter);
router.use('/api/v1/products', ProductRouter);




export default router;