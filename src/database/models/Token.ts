import { prop, getModelForClass, plugin } from '@typegoose/typegoose';
import mongoose_delete from 'mongoose-delete';

@plugin(mongoose_delete)
class RefreshTokenClass {
    @prop()
    public value?: string;

    @prop({ type: Date, expires: '30d', default: Date.now })
    createdAt?: Date;
}

const RefreshToken = getModelForClass(RefreshTokenClass);

export default RefreshToken;
