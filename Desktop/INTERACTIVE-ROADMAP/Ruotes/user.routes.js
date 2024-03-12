// register user
// login user
// get all users
// get one user
// update user
// delete user

import Router from "express";
import * as userController from "../Controllers/user.controller.js"

const router = Router();


router.route('/')
    .post(userController.addUser)
    .get(userController.getAllUsers)


router.route('/:id')
    .get(userController.getOneUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser)