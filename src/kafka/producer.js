const kafka = require('../config/kafka.config');

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
  console.log('Producer connected');
};

const sendMessage = async (topic, messages) => {
  try {
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(messages) }],
    });
    console.log(messages);
    console.log(`Message sent to topic ${topic}`);
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

module.exports = { connectProducer, sendMessage };
