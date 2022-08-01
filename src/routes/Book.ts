import express from 'express';
import controller from '../controllers/Book';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/', ValidateSchema(Schemas.book.create), controller.createBook);
router.get('/', controller.readAll);
router.get('/:id', controller.readBook);
router.patch('/:id', ValidateSchema(Schemas.book.update), controller.updateBook);
router.delete('/:id', controller.deleteBook);

export default router;
