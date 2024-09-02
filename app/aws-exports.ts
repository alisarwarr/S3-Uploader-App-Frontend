"use client";
//AWS-AMPLIFY
import { Amplify, type ResourcesConfig } from 'aws-amplify';


const appsyncConfig: ResourcesConfig["API"] = {
    GraphQL: {
        endpoint: "https://gtr6k75oprfgrndpjiubxsgpwe.appsync-api.eu-west-2.amazonaws.com/graphql",
        apiKey: "da2-xy7fw7sd7vcxdp332dinl5ji5a",
        defaultAuthMode: "apiKey",
        region: "eu-west-2"
    }
}


Amplify.configure({ API: appsyncConfig }, { ssr: true });


export default function ConfigureAmplifyClientSide() {
    console.log({ appsyncConfig });
    return null;
}