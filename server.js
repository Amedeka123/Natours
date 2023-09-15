
const dotenv = require('dotenv');
const mongoose = require('mongoose')
dotenv.config({ path: './config.env' });

const app = require('./app');

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

// const testTour = new Tour({
//   name:"The Park Camper",
//   price:497
// })

// testTour.save().then(doc=>{
//   console.log(doc)
// }).catch(err=>{
//   console.log("Error",err)
// })

const port = 3000;
app.listen(port, () => {
  console.log(`App running on ${port}...`);
});
