import mongoose from 'mongoose';
const mongodbURI = process.env.mongodbURI || "mongodb+srv://shaikhahsanali0303:brandstepcar123@cluster0.5rbqfne.mongodb.net/?retryWrites=true&w=majority";
/////////////////////////////////////////////////////////////////////////////////////////////////

const stockschema = new mongoose.Schema({
  carname: String,
  make: String,
  model: String,
  bodys: String,
  milage: String,

  year: String,
  color: String,
  fueltype: String,
  gearbox: String,
  door: String,
  enginetype: String,
  enginesize: String,
  mpg: String,
  height: String,
  length: String,

  width: String,
  co2emission: String,
  ledlight: String,
  navigation: String,
  coolingseats: String,
  soundsystem: String,
  airbags: String,
  backcamera: String,
  parkingcamera: String,
  traction: String,

  antilockbreaks: String,
  aircondition: String,
  climatecontrol: String,
  sunroof: String,
  price: String,
  installment: String,
  installmentmonths: String,
  imageUrl1: { type: String},
  imageUrl2: { type: String},
  imageUrl3: { type: String},
  imageUrl4: { type: String},
  imageUrl5: { type: String},
  imageUrl6: { type: String},

  description: String,
  sold: { type: Boolean, default: false },
  createdOn: { type: Date, default: Date.now },
});


const Stocks = mongoose.model('Stocks', stockschema);
mongoose.connect(mongodbURI);
////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////

export default Stocks;
