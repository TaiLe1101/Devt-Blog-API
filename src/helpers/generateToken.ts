import jwt from 'jsonwebtoken';
import User from '../database/models/Users';

function generateToken(key: string, user: User, expiresIn: string | number) {
    return jwt.sign(
        {
            id: user.id,
            avatar: user.avatar,
        },
        key,
        {
            expiresIn,
        }
    );
}

export default generateToken;
