import express from 'express';
import controller from '../controllers/Author';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/', ValidateSchema(Schemas.author.create), controller.createAuthor);
router.get('/', controller.readAll);
router.get('/:id', controller.readAuthor);
router.patch('/:id', ValidateSchema(Schemas.author.update), controller.updateAuthor);
router.delete('/:id', controller.deleteAuthor);

export default router;
