import AWS from "aws-sdk";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function addItemToHistory(event) {
    const dynamodb = new AWS.DynamoDB();
    const data = JSON.parse(event.body);

    let TableName = 'predeparture-content-history';

    if (data.stage === 'development') {
      TableName = 'predeparture-content-dev'
    }


    const params = {
        TableName,
        Item: {
          time: Date.now(),
          content: data.content,
          user: data.user,
        }
      };
    try {
        await dynamoDbLib.call("put", params);
        return success(params.Item);
    } catch (e) {
        return failure(e);
    }
}

export async function getItemHistory(event) {
    let TableName = 'predeparture-content-history';
    console.log()
    if (event.queryStringParameters) {
      if (event.queryStringParameters.stage === 'development') {
      TableName = 'predeparture-content-dev'
      }
    }

    var params = {
        TableName
      };
      
      try {
        const result = await dynamoDbLib.call("scan", params);
        return success(result);
      } catch (e) {
        console.log(e)
      }
}