const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: String,
    required: true,
  },
  // image: {
  //   type: String,
  //   required: true,
  // },
  
 
  stock: {
    type: String,
    required: true,
  }
  // Add more properties based on your product requirements
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
