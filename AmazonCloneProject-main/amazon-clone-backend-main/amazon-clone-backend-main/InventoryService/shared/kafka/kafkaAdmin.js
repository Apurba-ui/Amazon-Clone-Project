const { kafka } = require('./kafkaConfig');

async function createTopics() {
    try {
        const admin = kafka.admin(); 
      await admin.connect();
      console.log('Connected to Kafka as Admin.');
  
      await admin.createTopics({
        topics: [
          {
            topic: 'order-created', // Topic name
            numPartitions: 1,       // Number of partitions
          },
        ],
      });
  
      console.log('Topic "order-created" created successfully.');
      await admin.disconnect();
      console.log('Disconnected from Kafka Admin.');
    } catch (err) {
      console.error('Error creating topics:', err.message);
    }
  }
  

module.exports = { createTopics };