import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensurenceAuthenticated';
import { AppointmentsController } from '@modules/appointments/infra/http/controllers/AppointmentsController';

export const appointmentsRoutes = Router();
const appointmentsController = new AppointmentsController();

appointmentsRoutes.use(ensureAuthenticated);

// appointmentsRoutes.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.status(200).json(appointments);
// });

appointmentsRoutes.post('/', appointmentsController.create);

// export default appointmentsRoutes;
