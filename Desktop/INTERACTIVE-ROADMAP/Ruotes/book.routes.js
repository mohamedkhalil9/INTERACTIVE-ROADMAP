import Router from "express";
import * as bookController from "../Controllers/book.controller.js"

const router = Router();


router.route('/')
  .post(bookController.addBook)
  .get(bookController.getAllBooks)


router.route('/:id')
  .get(bookController.getOneBook)
  .put(bookController.updateBook)
  .delete(bookController.deleteBook)



export default router;