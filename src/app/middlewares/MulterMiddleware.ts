import multer from 'multer';

class MulterMiddleware {
    private createStore() {
        return multer.diskStorage({
            filename: function (req, file, cb) {
                cb(null, file.originalname);
            },
        });
    }

    up() {
        return multer({ storage: this.createStore() });
    }
}

export default new MulterMiddleware();
