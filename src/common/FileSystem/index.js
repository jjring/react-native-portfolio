const RNFS = require('react-native-fs');

export const writeFile = (filePath, contents) => {
  return RNFS.writeFile(filePath, contents)
    .then(() => {
      return { filePath, contents };
    })
    .catch(() => {
      // console.log('writeFile error - ', error);
    });
};

export const deleteFile = (filePath) => {
  return RNFS.unlink(filePath)
    .then(() => {
      return filePath;
    })
    .catch(() => {
      // console.log('deleteFile error - ', error);
    });
};
