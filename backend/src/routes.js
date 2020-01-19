import { Router } from 'express';

import DevController from './app/controllers/DevController';
import SearchController from './app/controllers/SearchController';

const routes = new Router();

routes.post('/devs', DevController.store);
routes.get('/devs/:id?', DevController.index);
routes.put('/devs/:id', DevController.update);
routes.delete('/devs/:id', DevController.delete);

routes.get('/search', SearchController.index);

export default routes;
