const mongoose = require('mongoose');

// MongoDB connection
const connectToDB = () => {
  mongoose.connect('mongodb+srv://cardb:kayteezy@cluster0.mzj7oqr.mongodb.net/car?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
    });
};

module.exports = {
  connectToDB,
};
