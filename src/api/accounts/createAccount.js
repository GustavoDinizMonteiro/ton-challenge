'use strict';

const { DynamoDB } = require('aws-sdk');
require('dotenv').config();
const dynamoDb = new DynamoDB.DocumentClient();

const createAccount = async (event) => {
  try {
    const { email, name } = checkBody(event.body)
    await checkAccount(email)

    await dynamoDb.put({
      TableName: process.env.ACCOUNTS_TABLE,
      Item: { Email: email, name }
    }).promise();
    
    return resSuccess(email)
  } catch (error) {
    return resError(error)
  }
}

const checkBody = body => {
  if (!body) {
    throw new Error('Request body not valid!');
  }
  const { email, name } = JSON.parse(body);
  if (!email || !email.includes('@')) {
    throw new Error('Email is not valid');
  }
  if (!name) {
    throw new Error('Name is not valid');
  } 
  return { name, email }
}


const checkAccount = async(email) => {
  const accountData = await dynamoDb.get({
    TableName: process.env.ACCOUNTS_TABLE,
    Key: { Email: email }
  }).promise();
  if (accountData.Item) {
    throw new Error('An account with the given email already exists')
  }
}

const resSuccess = email => ({
  statusCode: 200,
  body: JSON.stringify({
    message: `Sucessfully create account with email: ${email}`
  })
})

const resError = error => ({
  statusCode: 400,
  body: JSON.stringify({
    message: error.message
  })
})

module.exports = { createAccount }