import { Course } from "../Models/course.model.js";
import validation from "../Middlewares/Validation.js";
import asyncWrapper from "../Middlewares/asyncWrapper.js";
import errorHandler from "../Middlewares/errorHandler.js";

export const addCourse = async (req, res) => {
  try {
    validation.requiredData(req, res);
    // desturcture the request body
    const newCourse = {
      subject: req.body.subject,
      focus: req.body.focus,
      time: req.body.time,
    };

    const course = await Course.create(newCourse);

    return res.status(201).send(course);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    console.log(req.baseUrl);
    
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = ( page - 1 ) * limit;

    // return as an object
    const course = await Course.find({}).limit(limit).skip(skip);

    /*return as json (why object & json and not ).
    to use object as container and count (pagination)*/
    return res.status(200).json({
      count: course.length,
      data: course,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const getOneCourse = async (req, res) => {
  try {
    const { id } = req.params;

    // not valid id
    validation.checkValidId(req, res, id);

    const course = await Course.findById(id);

    // course is not found
    validation.notExistedCourse(req, res, course);

    return res.status(200).json(course);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    // check data
    validation.requiredData(req, res);

    const { id } = req.params;

    // not valid id
    validation.checkValidId(req, res, id);

    // destructure request body

    // update course in database
    const course = await Course.findByIdAndUpdate(id, req.body);

    // course is not found
    validation.notExistedCourse(req, res, course);
    res.status(200).send({ message: "course updated" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    // not valid id
    validation.checkValidId(req, res, id);

    const course = await Course.findById(id);

    // course is not found
    validation.notExistedCourse(req, res, course);

    // delete course from database
    await Course.findByIdAndDelete(id);
    res.status(200).send({ message: "course deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};