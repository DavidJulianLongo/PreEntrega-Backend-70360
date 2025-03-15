import { userService } from "./user.service.js";


class UserController {

    async getAll(req, res) {
        try {
            const users = await userService.getAll();
            res.status(200).json({ status: "success", payload: users });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async createUsersMock(req, res) {
        try {
            const { amount } = req.params;
            const users = await userService.createUserMock(amount);
            res.status(200).json({ status: "success", payload: users });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

}


export const userController = new UserController();