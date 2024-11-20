const kafka = require('../config/kafka.config');
const sequelize = require('../config/db');
const topicHandlers = require('./handlers'); // Import các topic và handler từ `handlers/index.js`

// Khởi tạo database
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((error) => console.log('Error creating database:', error));

// Khởi tạo Kafka consumer
const consumer = kafka.consumer({ groupId: 'hotel-group' });

const connectConsumer = async () => {
  await consumer.connect();
  console.log('Consumer connected');
};

const subscribeToTopics = async () => {
  for (const [topic, handler] of Object.entries(topicHandlers)) {
    await consumer.subscribe({ topic, fromBeginning: true });
    console.log(`Subscribed to topic: ${topic}`);

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const data = JSON.parse(message.value.toString());
          console.log(`Received message on topic ${topic}:`, data);
          await handler(data); // Gọi handler tương ứng
        } catch (error) {
          console.error(`Error processing message from topic ${topic}:`, error);
        }
      },
    });
  }
};

(async () => {
  await connectConsumer();
  await subscribeToTopics();
})();