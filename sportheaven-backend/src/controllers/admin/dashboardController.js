const User = require('../../models/User');
const Product = require('../../models/Product');
const getCustomersController = async (req, res) => {
  try {
    const customers = await User.find({ isAdmin: false })
      .select('-password -__v -isAdmin')
      .exec();
    if (customers.length == 0) {
      return res.status(404).json({ message: 'No users found' });
    }
    res.json({
      message: 'customers fetech successfully',
      users: customers,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'An error occurred while fetching customers.' });
  }
};
const getProductsController = async (req, res) => {
  try {
    const products = await Product.find({})
      .exec();
    if (products.length == 0) {
      return res.status(404).json({ message: 'No Products found' });
    }
    res.json({
      message: 'Products fetech successfully',
      products: products,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'An error occurred while fetching products.' });
  }
};

const storeProductController = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body; // Extract product details from the request body

    // if (!req.files || !req.files.image) {
    //   return res.status(400).json({ message: 'Image file is missing in the request' });
    // }

    // const image = req.files.image; // Access the 'image' file

    // Create a new product using the Product model
    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      // image: {
      //   data: image.data, // Assuming 'image.data' contains the file data after upload
      //   contentType: image.mimetype // Assuming 'image.mimetype' contains the file type
      // },
      // Add more fields as required based on your product schema
    });

    // Save the new product to the database
    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: 'Product created successfully',
      product: savedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteProductController = async (req, res) => {
  try {
    const productId = req.params.productId;

    // Delete the product using the product ID
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the product', error: error.message });
  }
};

const getProductController = async (req, res) => {
  try {
    const productId = req.params.productId;

    // Find the product using the product ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving the product', error: error.message });
  }
};


module.exports = {
  getCustomersController,storeProductController,getProductsController,deleteProductController,getProductController
};
