'use strict';

const countapi = require('countapi-js');
require('dotenv').config();

const getSiteStats = async (_) => {
  const result = await countapi.get(process.env.CountApiKey)
  return {
    statusCode: 200,
    body: JSON.stringify(result)
  };
};

module.exports = { getSiteStats }
