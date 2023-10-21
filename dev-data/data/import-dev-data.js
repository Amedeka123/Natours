const dotenv = require('dotenv');
const mongoose = require('mongoose')
const fs = require('fs')

const Review = require("./../../models/reviewsModel")

dotenv.config({ path: './config.env' });

//replace password in config file
const DB = process.env.DATABASED_CLOUD.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
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

  const review = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));
  // Import Data into DB
  const importData = async () => {
     try {
        await Review.create(review)
        console.log('Data successfully imported')
        process.exit();
     } catch (error) {
        console.log(error)
     }
  }
  //Delete all data from collection
  const deleteData = async () => {
    try {
        await Review.deleteMany()
        console.log('Data successfully deleted')
        process.exit();
    } catch (error) {
        console.log(error)
    }
  }

if(process.argv[2] === '--import'){
    importData()
}else if(process.argv[2] === '--delete'){
    deleteData()
}
