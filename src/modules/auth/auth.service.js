import { userDao } from '../../modules/users/user.dao.js';
import { createHash } from '../../common/utils/hashPassword.js';
import { isValidPassword } from '../../common/utils/hashPassword.js';
import { generateToken } from '../../common/utils/jwt.js';


class AuthService {

    async register(user) {
        const existingUser = await userDao.getOne({ email: user.email });
        if (existingUser) throw new Error('User already exists');

        const newUser = {
            ...user,
            password: createHash(user.password)
        }

        return await userDao.create(newUser);
    }


    async login(email, password) {
        const user = await userDao.getOne({ email });
        if (!user) throw new Error('User not found');

        const isValid = isValidPassword(password, user);
        if (!isValid) throw new Error('Invalid user name or password');

        const token = generateToken(user);
        return token;
    }
}

export const authService = new AuthService();