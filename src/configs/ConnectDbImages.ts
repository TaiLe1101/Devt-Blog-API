import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_IMG_NAME,
    api_key: process.env.CLOUD_IMG_API_KEY,
    api_secret: process.env.CLOUD_IMG_SECRET,
});

export default cloudinary;
