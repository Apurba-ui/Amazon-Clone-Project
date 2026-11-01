// shared/kafka/kafkaProducer.js
const {kafka} = require('./kafkaConfig');


async function sendMessage(topic, messages) {
  try {
    const producer = kafka.producer();
    await producer.connect();
    await producer.send({
      topic,
      messages: messages.map((msg) => ({ value: JSON.stringify(msg) })),
    });
    console.log(`Messages sent to topic ${topic}, mesage: `,messages);
    console.log("Disconnecting producer");
    await producer.disconnect();
  } catch (err) {
    console.error(`Failed to send messages to ${topic}:`, err);
  } 
}

module.exports = { sendMessage };
