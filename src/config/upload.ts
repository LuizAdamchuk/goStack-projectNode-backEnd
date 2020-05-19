import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

// -> import ex from '../../tmp' <- por isso passei o caminho dessa maneira
// no path resolver
const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export const uploadConfig = {
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const fileName = `${fileHash} - ${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
