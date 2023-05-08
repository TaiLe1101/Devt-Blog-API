import mongoose_delete from 'mongoose-delete';
import mongoose, { Schema } from 'mongoose';

// class RefreshTokenClass {
//     @prop()
//     public value?: string;

//     @prop({ type: Date, expires: '20s', default: Date.now })
//     createdAt?: Date;
// }

// const RefreshToken = getModelForClass(RefreshTokenClass);

// export default RefreshToken;

const RefreshTokenSchema = new Schema({
    value: String,

    createdAt: {
        type: Date,
        expires: '20s',
        default: Date.now,
    },
});

RefreshTokenSchema.plugin(mongoose_delete);

export default mongoose.model('RefreshToken', RefreshTokenSchema);
