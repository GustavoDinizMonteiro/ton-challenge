'use strict';

const { DynamoDB } = require('aws-sdk');
const dynamoDb = new DynamoDB.DocumentClient();

const getAccount = async (event) => {
  const { email } = JSON.parse(event.body);
  const accountData = await dynamoDb.get({
    TableName: 'create-account-dev',
    Key: email
  }).promise();
  return {
    statusCode: 200,
    body: JSON.stringify(accountData)
  }
}

module.exports = { getAccount }