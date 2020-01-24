
var aws = require('aws-sdk');

// create config header to AWS S3
const awsS3Config = () => {
    aws.config.update({
        secretAccessKey: '',
        accessKeyId: '',
        region: '',
    });
};

module.exports = awsS3Config;