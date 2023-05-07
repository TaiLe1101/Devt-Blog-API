import multer from 'multer';
import convertSignStringToUnSignString from './convertSignStringToUnSignString';

function generateDiskStorage(savePath: string) {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `src/public/uploads/${savePath}`);
        },
        filename: (req, file, cb) => {
            const timestamp = new Date().getTime();
            cb(
                null,
                timestamp +
                    '-' +
                    convertSignStringToUnSignString(file.originalname)
            );
        },
    });
}

export default generateDiskStorage;
