import { Router } from 'express';
import { store, index, show, remove, update } from '../controllers/Photo';
import Multer from '../library/Multer';

class PhotoRoutes {
	router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.post('/', Multer.single('image'), store);
		this.router.get('/', index);
		this.router.get('/:id', show);
		this.router.put('/:id', update);
		this.router.delete('/:id', remove);
	}
}

const photoRoutes = new PhotoRoutes();
export default photoRoutes.router;
