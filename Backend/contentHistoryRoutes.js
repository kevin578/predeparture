import AWS from "aws-sdk";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function addItemToHistory(event) {
    const dynamodb = new AWS.DynamoDB();
    const data = JSON.parse(event.body);
    const params = {
        TableName: "predeparture-content-history",
        Item: {
          time: Date.now(),
          content: data.content,
          user: data.user
        }
      };
    try {
        await dynamoDbLib.call("put", params);
        return success(params.Item);
    } catch (e) {
        return failure(e);
    }
}

export async function getItemHistory() {
    var params = {
        TableName : 'predeparture-content-history',
      };
      
      try {
        const result = await dynamoDbLib.call("scan", params);
        return success(result);
      } catch (e) {
        console.log(e)
      }
}