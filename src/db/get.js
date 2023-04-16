import { GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { ddbClient, ddbDocClient, tableName } from "./client.js";
import { itemCount } from "../util.js";

// **********************************************************************
// GETS DATA FROM ONE ID
// **********************************************************************

export const getData = async (id) => {
    const { Item } = await ddbDocClient.send(
        new GetCommand({
            TableName: tableName,
            Key: { id },
            ConsistentRead: true,
        })
    );
    return Item;
};

// **********************************************************************
// GETS DATA FROM ALL IDs (within range specified in util.js)
// **********************************************************************

export async function getAllItems() {
    
    const params = {
        TableName: tableName,
        FilterExpression: 'id <= :id',
        ExpressionAttributeValues: {
            ':id': itemCount
        }
    };
    
    const command = new ScanCommand(params);
    let response = await ddbClient.send(command);

    let items = [];
    items.push(...response.Items);

    // if response is paginated
    while (response.LastEvaluatedKey) {
        params.ExclusiveStartKey = response.LastEvaluatedKey;
        response = await ddbClient.send(new ScanCommand(params));
        items.push(...response.Items);
    }
    return items;
}