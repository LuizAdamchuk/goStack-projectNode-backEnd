import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensurenceAuthenticated';
import { ProvidersController } from '@modules/appointments/infra/http/controllers/ProvidersController';
import { ProviderMonthAvailabilityController } from '@modules/appointments/infra/http/controllers/ProviderMonthAvailabilityController';
import { ProviderDayAvailabilityController } from '@modules/appointments/infra/http/controllers/ProviderDayAvailabilityController';

export const providersRoutes = Router();

const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

providersRoutes.use(ensureAuthenticated);

providersRoutes.get('/', providersController.index);

providersRoutes.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index,
);

providersRoutes.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index,
);
