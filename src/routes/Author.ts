import express from 'express';
import controller from '../controllers/Author';

const router = express.Router();

router.post('/', controller.createAuthor);
router.get('/', controller.readAll);
router.get('/:id', controller.readAuthor);
router.patch('/:id', controller.updateAuthor);
router.delete('/:id', controller.deleteAuthor);

export default router;
