import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensurenceAuthenticated';
import { ProfileController } from '@modules/users/infra/http/controllers/ProfileController';

export const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);
