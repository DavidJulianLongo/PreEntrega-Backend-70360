import { userService } from "./user.service.js";


class UserController {

    async getAll(req, res) {
        try {
            const users = await userService.getAll();
            res.status(200).json({ status: "success", payload: users });
        } catch (error) {
            next(error);
        }
    }

    async createUsersMock(req, res) {
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

}


export const userController = new UserController();