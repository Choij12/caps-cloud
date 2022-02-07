'use strict';

const { Consumer } = require('sqs-consumer');

const queueUrl = 'https://sqs.us-west-2.amazonaws.com/211934723377/Packages.fifo';

const consumer = Consumer.create({
  queueUrl: queueUrl,
  handlePayload: (payload) => {
    console.log(payload);
  }
});

consumer.start();
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2'});

const sns = new AWS.SNS();

const topic = 'arn:aws:sns:us-west-2:211934723377:Delivered';

const payload = {
  store: 'Coffee Shop',
  orderID: '3213',
  customer: 'Jacob',
  address: 'New York, NY',
  TopicArn: topic, 
};

sns.publish(payload).promise() 
  .then(data => {
    console.log(data);
  })
  .catch(e => {
    console.log(e);
  });
