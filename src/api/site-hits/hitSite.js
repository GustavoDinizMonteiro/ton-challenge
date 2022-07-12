'use strict';

const countapi = require('countapi-js');
require('dotenv').config();

const hit = async (_) => {
  const res = await handleHit()
  if (res.requestSuceess) {
    return resSuccess(res.hitCount)
  }
  return resError()
};

const handleHit = async() => {
  const result = await countapi.hit(process.env.CountApiKey)
  return {
    requestSuceess: result.status == 200,
    hitCount: result.value
  }
};


const resSuccess = hitCount => ({
  statusCode: 200,
  body: JSON.stringify(
    {
      message: 'Access registred',
      hitCount
    }
  )
})

const resError = () => ({
  statusCode: 400,
  body: JSON.stringify(
    {
      message: 'Unable to register access'
    }
  )
})

module.exports = { hit }
