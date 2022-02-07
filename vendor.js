'use strict';

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2'});

const sns = new AWS.SNS();

const topic = 'arn:aws:sns:us-west-2:2119124723377:Pickup.fifo';

const payload = {
  Message: {
    store: 'Coffee Shop',
    orderID: '3123',
    customer: 'Jacob',
    address: 'New York, NY'
  },
  TopicArn: topic,
};

sns.publish(payload).promise() 
  .then(data => {
    console.log(data);
  })
  .catch(e => {
    console.log(e);
  });


const { Consumer } = require('sqs-consumer');

const queueUrl = 'https://sqs.us-west-2.amazonaws.com/2119124723377/Delivery';

const consumer = Consumer.create({
  queueUrl: queueUrl,
  handlePayload: (payload) => {
    console.log(payload);
  }
});

consumer.start();