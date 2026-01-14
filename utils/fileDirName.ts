import path from 'path';
import { fileURLToPath } from 'url';

/**
 * import.meta.url
 */
type url = string
const getFileDirName = (url: url) => {
  const __filename = fileURLToPath(url);
  const __dirname = path.dirname(__filename);
  const formatedPath = path.parse(__filename);
  return {
    __filename,
    __dirname,
    ...formatedPath
  }

}

const fileDirName = {
  getFileDirName
}

export default fileDirName