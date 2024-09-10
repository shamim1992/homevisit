import multer from 'multer';
import path from 'path';

// Set storage engine
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Adjust the path as per your project structure
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

// File filter for validating file types
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Error: File upload only supports the following filetypes - ' + allowedFileTypes);
    }
};

// Initialize upload
// export const upload = multer({
//     storage: storage,
//     limits: { fileSize: 1024 * 1024 * 10 }, // 10MB limit
//     fileFilter: fileFilter
// });

export default multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 10 }, // 10 MB limit
    fileFilter: fileFilter
});
