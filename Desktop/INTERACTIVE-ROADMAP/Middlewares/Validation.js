import mongoose from "mongoose";

const requiredData = (req, res) => {
  if (req.baseUrl == "/books") {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Please provide a title, author and publishYear",
      });
    }
  } else if (req.baseUrl == "/courses") {
    if (!req.body.subject || !req.body.focus || !req.body.time) {
      return res.status(400).send({
        message: "Please provide a subject, focus and time",
      });
    }
  }
};

const notExistedBook = (req, res, book, course) => {
  if (!book) {
    return res.status(404).send({
      message: "Book not found",
    });
  }
};

const notExistedCourse = (req, res, course) => {
  if (!course) {
    return res.status(404).send({
      message: "Course not found",
    });
  }
};

const checkValidId = (req, res, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send({
      message: "Not valid id",
    });
  }
};

export default {
  requiredData,
  notExistedBook,
  notExistedCourse,
  checkValidId,
};
