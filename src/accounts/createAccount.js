'use strict';

const { DynamoDB } = require('aws-sdk'); 
const dynamoDb = new DynamoDB.DocumentClient();

const createAccount = async(event) => {
  const { email, name } = JSON.parse(event.body);
  await dynamoDb.put({
    TableName: 'create-account-dev',
    Item: { Email: email, name }
  }).promise();
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Sucessfully create account ${email}`
    })
  }
}

module.exports = { createAccount }