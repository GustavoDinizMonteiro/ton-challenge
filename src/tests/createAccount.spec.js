const { mockDynamoDbPut } = require('./mocks')
const { createAccount } = require('../api/accounts/createAccount');
const AWS = require('aws-sdk');

jest.mock('aws-sdk', () => {
  return {
    DynamoDB: {
      DocumentClient: jest.fn(() => ({
        put: mockDynamoDbPut
      }))
    }
  }
});

describe('Create Account function tests', () => {
  test("it should create a account and return response code 200", async () => {

    let email = 'random@email.com';
    let input = {
      body: JSON.stringify({ name: 'random', email })
    }

    let output = {
      statusCode: 200,
      body: JSON.stringify({
        message: `Sucessfully create account ${email}`
      })
    }

    await expect(createAccount(input)).resolves.toEqual(output)
  });
});