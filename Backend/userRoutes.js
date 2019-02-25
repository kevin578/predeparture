import AWS from "aws-sdk";
import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function addUser(event) {
    const data = JSON.parse(event.body);
    console.log(data)
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

export async function getUser() {
    //const data = JSON.parse(event.body);

    const params = {
        TableName: "predeparture-users",
        Key: {
            userId: "12345",
            userEmail: "kevinbriggs1@gmail.com"
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