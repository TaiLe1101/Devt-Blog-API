import { prop, getModelForClass } from '@typegoose/typegoose';

class RefreshTokenClass {
    @prop()
    public value?: string;
}

const RefreshToken = getModelForClass(RefreshTokenClass);

export default RefreshToken;
