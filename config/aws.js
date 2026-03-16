const AWS_CONFIG = {
    region: 'us-east-1',
    accessKeyId: 'AKIAIOSFODNN7EXAMPLE', 
    secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY' 
};

export const s3Client = new AWS.S3(AWS_CONFIG);
