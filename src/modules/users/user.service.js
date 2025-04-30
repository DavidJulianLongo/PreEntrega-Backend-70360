import { userDao } from './user.dao.js';
import { userMock } from '../../mocks/user.mock.js';
import { AppError } from '../../common/errors/appError.js';
import UserDTO from './user.dto.js';
import { isValidPassword } from '../../common/utils/hashPassword.js';
import { createHash } from '../../common/utils/hashPassword.js';


class UserService {

    async createUserMock(amount) {
        const users = userMock(amount);
        await userDao.removeAll();

        for (const user of users) {
            if (user.email) user.email = user.email.toLowerCase();
            if (user.phone) user.phone = '+' + user.phone.replace(/\D/g, '').slice(0, 15);
            await userDao.create(user);
        }
        return await userDao.getAll();
    }

    async update(id, updateData) {
        const user = await userDao.getOne({ _id: id });
        if (!user) throw new AppError('User not found', 404);

        for (const key of Object.keys(updateData)) {
            if (typeof updateData[key] === "object" && user[key] !== undefined) {
                user[key] = { ...user[key], ...updateData[key] };
            } else {
                user[key] = updateData[key];
            }
        }


        const updatedUser = await userDao.update(user._id, user);
        return new UserDTO(updatedUser);
    }

    
    async restorePassword(id, newPassword) {
        const user = await userDao.getOne({ _id: id });
        if (!user) throw new AppError('User not found', 404);

        //Compara las passwords, para que la nueva no sea igual a la anterior
        const samePassword = isValidPassword(newPassword, user);
        if (samePassword) throw new AppError('New password must be different from the current one', 400);

        //Hashea la nueva contraseña y la actualiza
        const hashedPassword = createHash(newPassword);
        const updatedUser = await userDao.update(id, { password: hashedPassword });
        if (!updatedUser) throw new AppError('Internal server error', 500);

        return new UserDTO(updatedUser);
    }


    async getAll() {
        const users = await userDao.getAll();
        if (!users) throw new AppError('Not users found', 404);

        const usersDTOs = users.map(user => new UserDTO(user));
        return usersDTOs;
    }

    async getOne(id) {
        const user = await userDao.getOne({ _id: id });
        if(!user) throw new AppError('User not found', 404);

        return new UserDTO(user);
    }

    async remove(id) {
        const user = await userDao.getOne({ _id: id });
        if (!user) throw new AppError('User not found', 404);

        await userDao.remove(id);
        return new UserDTO(user);
    }
}

export const userService = new UserService();