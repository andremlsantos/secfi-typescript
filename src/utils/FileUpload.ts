import * as multer from 'multer'

class FileUpload {
    private _path = "avatars/";
    private fileType = "image/";

    constructor() {
        console.log("Storage init");
    }

    private setupStorage() {
        return multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, "avatars/");
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname);
            }
        });
    }

    private fileFilter = (req, file, cb) => {
        if (file.mimetype.includes(this.fileType)) {
            cb(null, true);
        } else {
            cb(new Error("Image not supported"), false);
        }
    };

    public upload(fieldName: string) {
        return multer({
            storage: this.setupStorage(),
            limits: {
                fileSize: 1024 * 1024 * 2
            },
            fileFilter: this.fileFilter
        }).single(fieldName);
    }
}

export default FileUpload;