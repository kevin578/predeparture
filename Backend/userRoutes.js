import AWS from "aws-sdk";
import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function addUser(event) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: "predeparture-users",
        Item: {
          id: data.id,
          email: data.email,
          givenName: data.givenName,
          createdAt: Date.now(),
          role: data.role
        }
      };
    
      try {
        await dynamoDbLib.call("put", params);
        return success(params.Item);
      } catch (e) {
        return failure(e);
      }
}

export async function getUserById(event) {
    const params = {
        TableName: "predeparture-users",
        Key: {
            id: event.queryStringParameters.id
        }
      };
    
      try {
        const result = await dynamoDbLib.call("get", params);
        return success(result);
      } catch (e) {
        return failure(e)
      }
}

export async function getAllUsers() {
    var params = {
        TableName : 'predeparture-users',
      };
      
      try {
        const result = await dynamoDbLib.call("scan", params);
        return success(result);
      } catch (e) {
        console.log(e)
      }
}

export async function editProgress(event) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: 'predeparture-users',
    Key: {
      id: '12345'
    },
    ExpressionAttributeValues: {
      ":progress": data.progress || null
    },
    ExpressionAttributeNames: {
        '#progress': "progress",
   },
    UpdateExpression: "SET #progress = :progress",
    ReturnValues: "ALL_NEW"
  }

  try {
    const result = await dynamoDbLib.call("update", params);
    return success(result);
  } catch (e) {
    console.log(e)
  }
}