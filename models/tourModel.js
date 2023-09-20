const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator')
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [
        40,
        'A tour name must have less or equal then 40 characters ',
      ],
      minlength: [10, 'A tour name must have more or equal then 10 characters'],
     // validate: [validator.isAlpha,"Tour name only contain characters "],
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    rating: {
      type: Number,
      default: 4.5,
      max: [5, 'Rating must be 5 maximun'],
      min: [1, 'Rating must be a minimum of 1'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a diffculty'],
      enum: {
        values: ['easy', 'medium', 'difficulty'],
        message: 'Difficulty is either: easy ,meduim,difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuaility: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to current document NEW document creation
          return val < this.price;
        },
        message: 'Discount price should be below regular price',
      },
    },
    summary: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
    slug: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});
// Document Middleware: runs before .save() and .create()
//   tourSchema.pre('save',function(next){
//   this.slug = slugify(this.name, { lower: true });
//   next()
//  })

//  tourSchema.post('save', function(doc,next){
//    console.log(doc)
//    next()
//  })
//Query Middleware

//  tourSchema.pre(/^find/, function (next) {
//    this.find({secretTour:{$ne:true}})
//    this.start = Date.now();
//    next();
//  });
//  tourSchema.post(/^find/, function (doc,next) {
//    console.log(`Query took ${Date.now() - this.start}milliseconds!`)
//     console.log(doc)
//     next();
//   });

//  tourSchema.pre('aggregate',function(next){
//    this.pipeline().unshift({$match:{secretTour:{$ne:true}}})
//    console.log(this.pipeline());
//    next()
//  })

const Tour = mongoose.model('Tous', tourSchema);
module.exports = Tour;
