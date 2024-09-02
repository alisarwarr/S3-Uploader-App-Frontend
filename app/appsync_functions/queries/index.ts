//AWS-AMPLIFY
import { generateClient } from 'aws-amplify/api';
//GRAPHQL-QUERIES
import {
    all_uploaders
} from '../../graphql/queries';


const client = generateClient();


export const fetchAllUploaders = async () => {
    try {
        const { data }: any = await client.graphql({ query: all_uploaders });
        return data.all_uploaders;    
    }
    catch (error) {
        alert(`error all_uploaders: ${JSON.stringify(error)}`);
        return [];
    }
}