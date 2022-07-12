'use strict';

const countapi = require('countapi-js');
require('dotenv').config();

const getSiteStats = async (_) => {
  const { status, value } = await countapi.get(process.env.CountApiKey)
  if (status === 200) {
    return resSuccess(value)
  }
  return resError()
};

const resSuccess = hitCount => ({
  statusCode: 200,
  body: {
    hitCount
  }
})

const resError = () => ({
  statusCode: 400,
  body: {
    message: 'Unable to retrieve data'
  }
})

module.exports = { getSiteStats }
