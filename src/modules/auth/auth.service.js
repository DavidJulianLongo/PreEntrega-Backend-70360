import { userDao } from '../../modules/users/user.dao.js';
import { createHash } from '../../common/utils/hashPassword.js';
import { isValidPassword } from '../../common/utils/hashPassword.js';
import { generateToken } from '../../common/utils/jwt.js';
import { AppError } from '../../common/errors/appError.js'; 
import UserDTO from '../users/user.dto.js';


class AuthService {

    async register(user) {
        const hashedPassword = createHash(user.password);
        const userDTO = new UserDTO({ ...user, password: hashedPassword });  

        const existingUser = await userDao.getOne({ email: userDTO.email });
        if (existingUser) throw new AppError('User already exists', 409);

        const newUser = await userDao.create({ ...userDTO, password: hashedPassword });
        return newUser;
    }


    async login(email, password) {
        const user = await userDao.getOne({email});
        if (!user) throw new AppError('Invalid email or password', 401);

        const isValid = isValidPassword(password, user);
        if (!isValid) throw new AppError('Invalid email or password', 401);

        const token = generateToken(user);
        return token;
    }
}


export const authService = new AuthService();