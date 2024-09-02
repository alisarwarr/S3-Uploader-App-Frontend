//AWS-SDK
import AWS from 'aws-sdk';



const S3_BUCKET = "s3uploaderapp---bucket";
const REGION = "eu-west-2";



AWS.config.update({
    accessKeyId: "AKIATCKATCXBTWJFL77B",
    secretAccessKey: "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",
    region: REGION
});
const s3 = new AWS.S3({
    region: REGION
});



export const fileUploader = async (file: File) => {
    const params = {
        Bucket: S3_BUCKET,
        Key: file.name,
        Body: file,
        //set the ACL to public-read
        ACL: "public-read"
    };


    try {
        await s3.putObject(params).promise();
        const url = `https://${S3_BUCKET}.s3.amazonaws.com/${file.name}`;
        return url;
    }
    catch (error) {
        alert("File upload failed.");
        return null;
    }
}



export const filesDownloader = async (fileName: string) => {
    const params = {
        Bucket: S3_BUCKET,
        Key: fileName
    };


    try {
        window.open(
            await s3.getSignedUrl('getObject', params),
            '_blank'
        );
    }
    catch (error) {
        alert("File download failed.");
    }
}