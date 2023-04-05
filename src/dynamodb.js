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

export const updateWins = async (id, emotion, incr) => {
    
    const winType = emotion + "_wins";
    const matchType = emotion + "_matchups";

    var songItem = await getData(id);

    const emotionMatchups = songItem[matchType] === undefined ? 0 : songItem[matchType]
    const wins = songItem[winType] === undefined ? 0 : songItem[winType];

    await updateWinData(id, emotionMatchups, matchType, wins, winType, incr);
}

export const updateSkips = async (id1, id2, emotion) => {

    const skipType = emotion + "_skips";
    const matchType = emotion + "_matchups";

    var songItem1 = await getData(id1);
    var songItem2 = await getData(id2)

    const emotionMatchups1 = songItem1[matchType] === undefined ? 0 : songItem1[matchType]
    const emotionMatchups2 = songItem2[matchType] === undefined ? 0 : songItem2[matchType]
    const skips1 = songItem1[skipType] === undefined ? 0 : songItem1[skipType];
    const skips2 = songItem2[skipType] === undefined ? 0 : songItem2[skipType];

    await updateSkipData(id1, emotionMatchups1, matchType, skips1, skipType);
    await updateSkipData(id2, emotionMatchups2, matchType, skips2, skipType);

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
// helper functions (updates)
// **********************************************************************

const updateWinData = async (id, emotionMatchups, 
                          matchType, wins, winType, incr) => {
    await ddbClient.send(
        new UpdateCommand({
            TableName: tableName,
            Key: {
                "id": parseInt(id)
            },
            UpdateExpression: "set #wins = :x, #emotion_matchups = :y",
            ExpressionAttributeNames: {
                "#wins": winType,
                "#emotion_matchups": matchType
            },
            ExpressionAttributeValues: {
                ":x": wins + incr,
                ":y": emotionMatchups + 1
            },
            ReturnValues: "ALL_NEW",
        })
    );
}

const updateSkipData = async (id, emotionMatchups, 
                        matchType, skips, skipType) => {
    await ddbClient.send(
        new UpdateCommand({
            TableName: tableName,
            Key: {
                "id": parseInt(id)
            },
            UpdateExpression: "set #skips = :x, #emotion_matchups = :y",
            ExpressionAttributeNames: {
                "#skips": skipType,
                "#emotion_matchups": matchType
            },
            ExpressionAttributeValues: {
                ":x": skips + 1,
                ":y": emotionMatchups + 1
            },
            ReturnValues: "ALL_NEW",
        })
    );
}