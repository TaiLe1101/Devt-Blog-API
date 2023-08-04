import jwt from 'jsonwebtoken';
import { UserEntity } from '../database/entities/UserEntity';

function generateToken(
    key: string,
    user: UserEntity,
    expiresIn: string | number
) {
    return jwt.sign(
        {
            id: user.id,
        },
        key,
        {
            expiresIn,
        }
    );
}

export default generateToken;
