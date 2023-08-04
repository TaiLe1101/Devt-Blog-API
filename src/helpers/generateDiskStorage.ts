/* eslint-disable @typescript-eslint/no-unused-vars */
import multer from 'multer';
import convertSignStringToUnSignString from './convertSignStringToUnSignString';

// function generateDiskStorage(savePath: string) {
//     return multer.diskStorage({
//         destination: (req, file, cb) => {
//             cb(null, `src/public/uploads/${savePath}`);
//         },
//         filename: (req, file, cb) => {
//             const timestamp = new Date().getTime();
//             cb(
//                 null,
//                 timestamp +
//                     '-' +
//                     convertSignStringToUnSignString(file.originalname)
//             );
//         },
//     });
// }

function generateDiskStorage(savePath: string) {
    return multer.diskStorage({
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        },
    });
}

export default generateDiskStorage;
