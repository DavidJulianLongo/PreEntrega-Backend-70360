import { userDao } from './user.dao.js';
import { userMock } from '../../mocks/user.mock.js';


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
}

export const userService = new UserService();