const Product = require('../models/Product')

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body
    const product = new Product({
      name,
      description,
      price,
      createdBy: req.user.userId,
    })

    await product.save()
    res.json({ message: 'Product added successfully', product })
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' })
  }
}

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' })
  }
}

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ error: 'Product not found' })

    res.json(product)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' })
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price },
      { new: true }
    )

    res.json(updatedProduct)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' })
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.json({ message: 'Product deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' })
  }
}
