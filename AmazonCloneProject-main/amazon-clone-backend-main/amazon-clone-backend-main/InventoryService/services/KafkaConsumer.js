const {createConsumer} = require('../shared/kafka/kafkaConsumer');
const Product = require('../models/Products');

async function startConsumer () {
  try{
    await createConsumer('inventory-group', 'order-created', async (message) => {
      console.log('Processing order for inventory update:', message);
      const updatePromises = message.products.map(async (product) => {
        try {
          await updateInventoryDatabase(product.id); // Update inventory for the product
        } catch (err) {
          console.error(`Error updating inventory for product ${product.id}:`, err);
        }
      });
      Promise.all(updatePromises);
      console.log('Inventory updates completed for all products.');
    });
    console.log('Kafka Consumer started successfully for inventory updates.');
  } catch(e) {
    console.error('Failed to start Kafka Consumer:', error);
  }
}
async function updateInventoryDatabase(id) {
  try {
    // Find the product by ID and reduce noOfItems by 1
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id }, // Match the product by its ID
      { $inc: { noOfItems: -1 } }, // Decrease noOfItems by 1
      { new: true } // Return the updated product
    );

    if (updatedProduct) {
      console.log('Inventory updated successfully:', updatedProduct);
    } else {
      console.log('Product not found with the provided ID');
    }
  } catch (err) {
    console.error('Error updating inventory:', err);
  }
}

module.exports = {startConsumer};
