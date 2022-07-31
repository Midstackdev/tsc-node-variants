import express from 'express';
import controller from '../controllers/Book';

const router = express.Router();

router.post('/', controller.createBook);
router.get('/', controller.readAll);
router.get('/:id', controller.readBook);
router.patch('/:id', controller.updateBook);
router.delete('/:id', controller.deleteBook);

export default router;
