import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient  } from "@aws-sdk/lib-dynamodb";

// **********************************************************************
// SETTING UP DB CLIENT
// **********************************************************************

const marshallOptions = {
    convertEmptyValues: false, 
    removeUndefinedValues: true,
    convertClassInstanceToMap: false,   
};
  
const unmarshallOptions = {
    wrapNumbers: false,
};

export const ddbClient = new DynamoDBClient({ 
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY || process.env.SECRET_ACCESS_KEY
    }});

export const ddbDocClient = DynamoDBDocumentClient.from(
                    ddbClient, {marshallOptions, unmarshallOptions});

export const tableName = 'tempoprojectsongs';