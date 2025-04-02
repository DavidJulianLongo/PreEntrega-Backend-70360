import UserDTO from "./user.dto.js";
import { userService } from "./user.service.js";


class UserController {

    async getAll(req, res, next) {
        try {
            const users = await userService.getAll();
            res.status(200).json({ status: "success", payload: users });
        } catch (error) {
            next(error);
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const user = await userService.getOne({ _id: id });
            res.status(200).json({ status: "success", payload: user });
        } catch (error) {
            next(error)
        }
    }

    async createUsersMock(req, res, next) {
        try {
            const { amount } = req.params;
            const users = await userService.createUserMock(amount);
            res.status(200).json({ status: "success", payload: users });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const userId = req.user.id;
            const updateData = req.body;
            const user = await userService.update(userId, updateData);
            res.status(200).json({ status: "success", message: "User updated successfully", payload: user });
        } catch (error) {
            next(error);
        }
    }

    async restorePass(req, res, next) {
        try {
            const userId = req.user.id;
            const newPassword = req.body.newPassword;
            const user = await userService.restorePassword(userId, newPassword);
            res.status(200).json({ status: "success", message: "Password updated successfully", payload: user });
        } catch (error) {
            next(error);
        }
    }

}


export const userController = new UserController();