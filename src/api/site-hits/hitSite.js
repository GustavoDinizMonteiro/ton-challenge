'use strict';

const countapi = require('countapi-js');
require('dotenv').config();

const hit = async (_) => {
  const result = await countapi.hit(process.env.CountApiKey)
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Access registred',
        input: result,
      }
    ),
  };
};

module.exports = { hit }
