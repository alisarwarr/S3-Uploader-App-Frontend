//AWS-AMPLIFY
import { generateClient } from 'aws-amplify/api';
//GRAPHQL-MUTATIONS
import {
    create_uploader
} from '../../graphql/mutations';


const client = generateClient();


export const handleCreateUploader = async (name: string, surname: string, email: string, fileName: string) => {
    try {
        await client.graphql({
            query: create_uploader,
            variables: {
                name,
                surname,
                email,
                fileName
            }
        });
    }
    catch (error) {
        alert(`Failed: ${JSON.stringify(error)}`);
    }
}