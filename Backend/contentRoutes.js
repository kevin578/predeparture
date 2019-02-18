import AWS from "aws-sdk";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function getContent(event, context, callback) {
    console.log(event);
    //const data = JSON.parse(event.body);

    const params = {
        TableName: "predeparture-content",
        Key: {
           "content-key" : "clark_study_abroad"
        }
    }
    
    try {
        let result = await dynamoDbLib.call("get", params);
        return success(result.Item["content-array"]);
      } catch (e) {
        return failure(e);
      }
}

export async function updateContent(event, context) {
    const dynamodb = new AWS.DynamoDB();
    const data = JSON.parse(event.body);
    
    const params = {
        TableName: "predeparture-content",
        Key: {
           "content-key" : "clark_study_abroad",
        },
        ExpressionAttributeValues: {
          ":content": data.contentArray || null
        },
        ExpressionAttributeNames: {
            '#content': "content-array",
       },
        UpdateExpression: "SET #content = :content",
        ReturnValues: "ALL_NEW"
    }

    try {
        let result = await dynamoDbLib.call("update",params);
        return success(result.Item["content-array"]);
      } catch (e) {
        return failure(e);
      }
}