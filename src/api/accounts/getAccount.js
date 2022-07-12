'use strict';

const { DynamoDB } = require('aws-sdk');
require('dotenv').config();
const dynamoDb = new DynamoDB.DocumentClient();

const getAccount = async (event) => {
  try {
    const { email } = checkBody(event.body)    
    const accountData = await getAccountData(email)
    return resSuccess(accountData)
  } catch (error) {
    return resError(error)
  }
}

const checkBody = body => {
  if (!body) {
    throw new Error('Request body not valid!');
  }
  const { email } = JSON.parse(body);
  if (!email || !email.includes('@')) {
    throw new Error('Email is not valid');
  }
  return { email }
}

const getAccountData = async(email) => {
  const accountData = await dynamoDb.get({
    TableName: process.env.ACCOUNTS_TABLE,
    Key: { Email: email }
  }).promise();
  if (!accountData.Item) {
    throw new Error('There is no account with the email provided')
  }
  return accountData.Item
}

const resSuccess = Item => ({
  statusCode: 200,
  body: JSON.stringify({
    email: Item.Email,
    name: Item.name
  })
})

const resError = error => ({
  statusCode: 400,
  body: JSON.stringify({
    message: error.message
  })
})

module.exports = { getAccount }