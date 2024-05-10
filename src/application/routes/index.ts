import { Request, Response, Router } from 'express';
import userRouter from './user.router';
import ResponseMessages from '../../core/utils/constants';

const router = Router();

router.use('/user', userRouter);

// not found route
router.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: ResponseMessages.RES_MSG_NOT_FOUND_URL_EN,
  });
})

export default router;
