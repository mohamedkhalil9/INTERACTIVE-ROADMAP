import Router from "express";
import * as courseController from "../Controllers/course.controller.js"

const router = Router();


router.route('/')
  .post(courseController.addCourse)
  .get(courseController.getAllCourses)


router.route('/:id')
  .get(courseController.getOneCourse)
  .put(courseController.updateCourse)
  .delete(courseController.deleteCourse)



export default router;