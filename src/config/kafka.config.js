const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'hotel-booking-system',
  brokers: ['localhost:9092'],
});

module.exports = kafka;
