import { DynamoDBClient, DescribeTableCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

// **********************************************************************
// SETTING UP DB CLIENT
// **********************************************************************

const ddbClient = new DynamoDBClient({ 
    region: "us-east-1",
    credentials: {
        accessKeyId: "AKIAUP5Y7WATLS4FCSP7",
        secretAccessKey: "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",
    }});

const marshallOptions = {
    convertEmptyValues: false, 
    removeUndefinedValues: true,
    convertClassInstanceToMap: false,   
};
  
const unmarshallOptions = {
    wrapNumbers: false,
};

const ddbDocClient = DynamoDBDocumentClient.from(
                    ddbClient, {marshallOptions, unmarshallOptions});

const tableName = 'tempoprojectsongs'

// **********************************************************************
// MAIN FUNCTIONS
// **********************************************************************

export const updateScores = async (id, emotion, won) => {
    
    const scoreType = emotion + "_score";
    const incr = won ? 1 : 0;

    var songItem = await getData(id);

    const matchups = songItem['matchups'] === undefined ? 0 : songItem['matchups'];
    const score = songItem[scoreType] === undefined ? 0 : songItem[scoreType];

    await updateData(id, scoreType, matchups, score, incr);
}

export const getCount = async () => {
    
    const command = new DescribeTableCommand({TableName: tableName});
    const response = await ddbClient.send(command);
    return response['Table']['ItemCount'];

}

// **********************************************************************
// helper function (get)
// **********************************************************************

const getData = async (id) => {
    const { Item } = await ddbDocClient.send(
        new GetCommand({
            TableName: tableName,
            Key: {
            id
            },
            ConsistentRead: true,
        })
    );
    return Item;
};

// **********************************************************************
// helper function (update)
// **********************************************************************

const updateData = async (id, scoreType, matchups, score, incr) => {
    await ddbClient.send(
        new UpdateCommand({
            TableName: tableName,
            Key: {
                "id": parseInt(id)
            },
            UpdateExpression: "set matchups = :x, #score = :y",
            ExpressionAttributeNames: {
                "#score": scoreType
            },
            ExpressionAttributeValues: {
                ":x": matchups + 1,
                ":y": score + incr
            },
            ReturnValues: "ALL_NEW",
        })
    );
}
