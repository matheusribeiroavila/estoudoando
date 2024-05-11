import { Router } from 'express';

import { donations } from './donations';

const routes = Router();

routes.use('/donations', donations);

export { routes };
