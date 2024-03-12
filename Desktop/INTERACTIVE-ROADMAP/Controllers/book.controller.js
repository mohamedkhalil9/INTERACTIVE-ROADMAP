import { Book } from "../Models/book.model.js";
import validation from "../Middlewares/Validation.js";
import asyncWrapper from "../Middlewares/asyncWrapper.js";
import errorHandler from "../Middlewares/errorHandler.js";

export const addBook = async (req, res) => {
  try {
    validation.requiredData(req, res);
    // desturcture the request body
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);

    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = ( page - 1 ) * limit;

    // return as an object
    const books = await Book.find({}).limit(limit).skip(skip);

    /*return as json (why object & json and not )
    to use object as container and count (pagination)*/
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const getOneBook = async (req, res) => {
  try {
    const { id } = req.params;

    // not valid id
    validation.checkValidId(req, res, id);

    const book = await Book.findById(id);

    // book is not found
    validation.notExistedBook(req, res, book);

    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    // check data
    validation.requiredData(req, res);

    const { id } = req.params;

    // not valid id
    validation.checkValidId(req, res, id);

    // destructure request body

    // update book in database
    const book = await Book.findByIdAndUpdate(id, req.body);

    // book is not found
    validation.notExistedBook(req, res, book);
    res.status(200).send({ message: "book updated" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    // not valid id
    validation.checkValidId(req, res, id);

    const book = await Book.findById(id);

    // book is not found
    validation.notExistedBook(req, res, book);

    // delete book from database
    await Book.findByIdAndDelete(id);
    res.status(200).send({ message: "book deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};