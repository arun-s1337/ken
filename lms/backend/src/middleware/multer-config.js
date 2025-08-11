
import multer from 'multer';
import path from 'path';
import fs from 'fs';


const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});


const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  
  // Check mime type and extension
  const mimeTypeOk = allowedTypes.test(file.mimetype);
  const extNameOk = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  
  if (mimeTypeOk && extNameOk) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};


const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, 
    files: 5 
  },
  fileFilter: fileFilter
});

export default upload;