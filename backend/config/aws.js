const AWS = require("aws-sdk")

var BASE_PATH = 'local/'

if(process.env.NODE_ENV == "dev") BASE_PATH ="dev/"
if(process.env.NODE_ENV == "production") BASE_PATH ="live/"

const s3Bucket = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
  region: 'eu-west-1'
});
module.exports = {
  s3: s3Bucket,
  s3PreSignedUrl: function (file, expires = 60 * 30) {
    if (!file) return null
    return s3Bucket.getSignedUrl('getObject', {
      Bucket: process.env.AWS_BUCKET,
      Key: file,
      Expires: expires
    })
  },
  s3Upload: function (file, path, mimeType,ACL) {
    return new Promise(function (resolve, reject) {
      if (!file) {
        resolve(null)
        return
      }

      try {
        const params = {
          Bucket: process.env.AWS_BUCKET,
          Key: BASE_PATH + path,
          Body: file,
          ContentType: mimeType
        };
        if (ACL) {
          params.push(ACL)
        }

        s3Bucket.upload(params, function (err, data) {
          if (err) {
            console.log(err);
            console.log('Error uploading data: ', data);
          } else {
            resolve(data.key)
          }
        });

      } catch (e) {
        reject(e);
      }

    })
  }
}

