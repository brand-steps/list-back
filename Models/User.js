import mongoose from 'mongoose';
const mongodbURI = process.env.mongodbURI || "mongodb+srv://shaikhahsanali0303:listit123@cluster0.ihghd35.mongodb.net/?retryWrites=true&w=majority";
/////////////////////////////////////////////////////////////////////////////////////////////////

const listerschema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    postal: String,
    address: String,
    city: String,
    state: String,
    packagename: String,
    password: String,
    createdOn: { type: Date, default: Date.now },
});
const productschema = new mongoose.Schema({
    productname: String,
    category: String,
    subcategory: String,
    gender: String,
    type: String,
    condition: String,
    propertystate: String,
    areaunit: String,
    areasize: String,
    career: String,
    position: String,
    whatsapp: String,
    mobile: String,
    location: String,
    price: String,
    listername: String,
    listerid: String,
    description: String,
    bestSeller: { type: Boolean, default: false },
    topSeller: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
    Deactive: { type: Boolean, default: false },

    imageUrl1: String,
    imageUrl2: String,
    imageUrl3: String,
    imageUrl4: String,
    imageUrl5: String,
    imageUrl6: String,

    keyword1: String,
    keyword2: String,
    keyword3: String,
    keyword4: String,
    keyword5: String,
    keyword6: String,
    keyword7: String,
    keyword8: String,
    keyword9: String,
    keyword10: String,
    keyword11: String,
    keyword12: String,
    views: { type: Number, default: 0 },

    createdOn: { type: Date, default: Date.now },
});
export const productmodel = mongoose.model('products', productschema);

const listers = mongoose.model('Listers', listerschema);
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

export default listers;
