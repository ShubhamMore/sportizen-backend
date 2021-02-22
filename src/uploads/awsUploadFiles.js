const path = require('path');
const getImageSize = require('../functions/getImageSize');
const fs = require('fs').promises;
const s3 = require('./awsConfig');

const uploadFilesToAWS = async (filePath, fileName, cloudDirectory) => {
  try {
    let uploadLen = filePath.length;
    let uploadRes = new Array();
    let uploadErr = new Array();
    let fileErr = new Array();

    for (let i = 0; i < uploadLen; i++) {
      const fileContent = await fs.readFile(filePath[i]);

      // Setting up S3 upload parameters
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME + '/' + cloudDirectory,
        Key: fileName[i], // File name you want to save as in S3
        Body: fileContent,
        ACL: 'public-read',
      };
      // Uploading files to the bucket
      const res = await s3.upload(params).promise();

      if (res.Location) {
        res.size = await getImageSize(path.join(__dirname, '../../', filePath[i]));
        uploadRes.push(res);
      } else {
        uploadErr.push(res);
      }

      fs.unlink(path.join(__dirname, '../../', filePath[i]), (err) => {
        if (err) {
          fileErr.push(err);
        }
      });
    }

    return { uploadRes, uploadErr, fileErr };
  } catch (e) {
    const err = 'Something bad happen while uploading files, ' + e;
    throw new Error(err.replace('Error: ', ''));
  }
};

module.exports = uploadFilesToAWS;
