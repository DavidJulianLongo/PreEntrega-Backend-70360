import { userDao } from './user.dao.js';
import { userMock } from '../../mocks/user.mock.js';
import { AppError } from '../../common/errors/appError.js';
import UserDTO from './user.dto.js';
import { isValidPassword } from '../../common/utils/hashPassword.js';
import { createHash } from '../../common/utils/hashPassword.js';


class UserService {

    async getAll() {
        const users = await userDao.getAll();
        if (!users) throw new Error('Not users found');
        return users;
    }


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
        if (Object.keys(updateData).length === 0) throw new AppError('No data to update', 400);

        const user = await userDao.getOne({ _id: id });
        if (!user) throw new AppError('User not found', 404);

        if (updateData.first_name) user.first_name = updateData.first_name;
        if (updateData.last_name) user.last_name = updateData.last_name;
        if (updateData.email) user.email = updateData.email;
        if (updateData.phone) user.phone = updateData.phone;
        if (updateData.address.street) user.address.street = updateData.address.street;
        if (updateData.address.city) user.address.city = updateData.address.city;
        if (updateData.address.zipCode) user.address.zipCode = updateData.address.zipCode;

        const userDTO = new UserDTO(updateData);
        const updatedUser = await userDao.update(user._id, userDTO);
        return updatedUser
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
        if(!updatedUser) throw new AppError('Error updating password', 500);

        return updatedUser;
    }
}

export const userService = new UserService();