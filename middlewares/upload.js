import multer from "multer";

// Use memoryStorage (buffer in memory)
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;
