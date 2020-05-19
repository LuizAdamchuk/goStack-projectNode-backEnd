import { Router } from 'express';
import multer from 'multer';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensurenceAuthenticated';
import { uploadConfig } from '@config/upload';
import { UsersController } from '@modules/users/infra/http/controllers/UsersController';
import { UserAvatarController } from '@modules/users/infra/http/controllers/UserAvatarController';

export const usersRoutes = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRoutes.post('/', usersController.create);

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);
