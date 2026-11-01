// shared/kafka/kafkaConfig.js
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: "amazon-clone", 
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"], 
});

module.exports = {kafka};
