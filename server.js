const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });

const app = require('./app');

//replace password in config file
const DB = process.env.DATABASED_CLOUD.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

const url = 'mongodb://localhost:27017/natours';

// Database connection
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: false,
  })
  .then(() => {
    console.log('database connected');
  });

const port = 3000;
const server = app.listen(port, () => {
  console.log(`App running on ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! Shutting down...');
  server.close();
  process.exit(1);
});
