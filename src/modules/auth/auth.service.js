import { userDao } from '../../modules/users/user.dao.js';
import { createHash } from '../../common/utils/hashPassword.js';
import { isValidPassword } from '../../common/utils/hashPassword.js';
import { generateToken } from '../../common/utils/jwt.js';
import { AppError } from '../../common/errors/appError.js'; 
import UserDTO from '../users/user.dto.js';



class AuthService {

    async register(user) {
        //Transformmamos los datos con el DTO antes de comparar
        const userDTO = new UserDTO(user);  
        const existingUser = await userDao.getOne({ email: userDTO.email });
        if (existingUser) throw new AppError('User already exists', 409);

        userDTO.password = createHash(userDTO.password);
        return await userDao.create(userDTO);
    }


    async login(email, password) {
        const user = await userDao.getOne({email});
        if (!user) throw new AppError('User not found', 404);

        const isValid = isValidPassword(password, user);
        if (!isValid) throw new AppError('Invalid email or password', 401);

        const token = generateToken(user);
        return token;
    }
}


export const authService = new AuthService();