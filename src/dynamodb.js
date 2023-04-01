import { DynamoDBClient, DescribeTableCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

// **********************************************************************
// SETTING UP DB CLIENT
// **********************************************************************

const ddbClient = new DynamoDBClient({ 
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
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
    const matchType = emotion + "_matchups";
    const incr = won ? 1 : 0;

    var songItem = await getData(id);

    const matchups = songItem['matchups'] === undefined ? 0 : songItem['matchups'];
    const emotionMatchups = songItem[matchType] === undefined ? 0 : songItem[matchType]
    const score = songItem[scoreType] === undefined ? 0 : songItem[scoreType];

    await updateData(id, matchups, emotionMatchups, matchType, score, scoreType, incr);
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

const updateData = async (id, matchups, emotionMatchups, 
                          matchType, score, scoreType, incr) => {
    await ddbClient.send(
        new UpdateCommand({
            TableName: tableName,
            Key: {
                "id": parseInt(id)
            },
            UpdateExpression: "set matchups = :x, #score = :y, #emotion_matchups = :z",
            ExpressionAttributeNames: {
                "#score": scoreType,
                "#emotion_matchups": matchType
            },
            ExpressionAttributeValues: {
                ":x": matchups + 1,
                ":y": score + incr,
                ":z": emotionMatchups + 1
            },
            ReturnValues: "ALL_NEW",
        })
    );
}