// aws S3 configuration
const awsS3Config = require('../config/awsS3');
awsS3Config();

var multer = require('multer')
var multerS3 = require('multer-s3')
 
var s3 = new aws.S3({ /* ... */ })
 
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'vpvnguyen-image-test',
    metadata: function (req, file, cb) {
    //   cb(null, {fieldName: file.fieldname});
    cb(null, {fieldName: 'TESTING_META_DATA'});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});

module.exports = upload;