import { userDao } from '../../modules/users/user.dao.js';
import { createHash } from '../../common/utils/hashPassword.js';
import { isValidPassword } from '../../common/utils/hashPassword.js';
import { generateToken } from '../../common/utils/jwt.js';
import { AppError } from '../../common/errors/appError.js'; 




class AuthService {

    async register(user) {
        const existingUser = await userDao.getOne({ email: user.email });
        if (existingUser) throw new AppError('User already exists', 400);

        const newUser = {
            ...user,
            password: createHash(user.password)
        }

        return await userDao.create(newUser);
    }


    async login(email, password) {
        const user = await userDao.getOne({ email });
        if (!user) throw new AppError('User not found', 404);

        const isValid = isValidPassword(password, user);
        if (!isValid) throw new AppError('Invalid email or password', 400);

        const token = generateToken(user);
        return token;
    }
}


export const authService = new AuthService();