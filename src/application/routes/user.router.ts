import { Router } from "express";
import { container } from "../../di/container";
import { Types } from "../../di/types";
import UserController from "../controllers/user.controller";

const controller: UserController = container.get<UserController>(
  Types.UserController
)

const router = Router();

router.route('/getAll').get(controller.getUsers);

router.route('/getById').get(controller.getUsers);

router.route('/create').post(controller.createUser);

router.route('/update').patch(controller.updateUser);

router.route('/delete').delete(controller.deleteUserById);

export default router;
