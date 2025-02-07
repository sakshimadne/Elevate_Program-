const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://nick:nick@cluster0.zsohzko.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    console.log(' MongoDB Connected Successfully')
  } catch (error) {
    console.error('MongoDB Connection Failed:', error.message)
    process.exit(1)
  }
}

module.exports = connectDB
