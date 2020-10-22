import {Router} from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import EstruturaController from './controllers/EstruturaController';

const routes = Router();
const upload = multer(uploadConfig); 

routes.get('/estruturas', EstruturaController.index);
routes.get('/estruturas/:id', EstruturaController.show);
routes.post('/estruturas',upload.array('images'), EstruturaController.create);


 export default routes;