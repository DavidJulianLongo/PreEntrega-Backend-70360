import { userDao } from './user.dao.js';
import { userMock } from '../../mocks/user.mock.js';
import { AppError } from '../../common/errors/appError.js';
import UserDTO from './user.dto.js';



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
}

export const userService = new UserService();