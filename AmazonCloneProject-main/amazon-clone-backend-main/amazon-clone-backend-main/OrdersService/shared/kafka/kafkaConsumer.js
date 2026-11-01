// shared/kafka/kafkaConsumer.js
const { kafka } = require('./kafkaConfig');

async function createConsumer(groupId, topic, onMessage) {
  try {
    console.log("Creating consumer");
    const consumer = kafka.consumer({ groupId: 'inventory-group' });
    await consumer.connect();
    console.log(`Connection to consumer successfull`);
    await consumer.subscribe({ topics: ['order-created'], fromBeginning: true });
    console.log(`subscribing to consumer successfull`);
    await consumer.run({
      eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
        const msg = JSON.parse(message.value.toString());
        console.log(`Message received from ${topic}:`, msg);
        onMessage(msg);
      },
    });

  } catch (e) {
    console.log(`Error in creating consumer: `, e);
  }

}

// Call the consumer function if this script is run directly
if (require.main === module) {
  const groupId = 'test-group'; // Replace with your desired group ID
  const topic = 'test-topic'; // Replace with your desired topic
  const onMessage = (msg) => {
    console.log("Processing message:", msg);
    // Add custom message processing logic here
  };

  createConsumer(groupId, topic, onMessage)
    .then(() => console.log("Consumer is running"))
    .catch((err) => console.error("Error in Kafka Consumer:", err));
}

module.exports = { createConsumer };
