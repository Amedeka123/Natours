const dotenv = require('dotenv');
const mongoose = require('mongoose')
const fs = require('fs')

const Tour = require("./../../models/tourModel")

dotenv.config({ path: './config.env' });

//replace password in config file
const DB = process.env.DATABSED_CLOUD.replace(
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

  const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));
  // Import Data into DB
  const importData = async () => {
     try {
        await Tour.create(tours)
        console.log('Data successfully imported')
        process.exit();
     } catch (error) {
        console.log(error)
     }
  }
  //Delete all data from collection
  const deleteData = async () => {
    try {
        await Tour.deleteMany()
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
