import express from "express";
import User from "./Models/User.js"; // Adjust the path based on your directory structure
import bcrypt from "bcrypt";
import crypto from "crypto"; // Import the 'crypto' module
import jwt from "jsonwebtoken"; // Import the jsonwebtoken library
import nodemailer from "nodemailer";
const app = express();
const port = process.env.PORT || 8000; // Use process.env.PORT for flexibility
import cors from "cors";
const SECRET = process.env.SECRET || "topsecret";
import cookieParser from "cookie-parser";
import multer from "multer";
import bucket from "./Bucket/Firebase.js";
import fs from "fs";
import path from "path";
import Stocks from "./Models/User.js";

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors({origin: true, credentials: true}));

const storage = multer.diskStorage({
  destination: "/tmp",
  filename: function (req, file, cb) {
    console.log("mul-file: ", file);
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  },
});
const upload = multer({ storage });
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Ahemd Raza ");
});


app.post("/productrequesttest", upload.array('images', 6), (req, res) => {
  try {
    const body = req.body;


    console.log("req.body: ", req.body);
    console.log("req.files: ", req.files);

    // Iterate over the uploaded files
    const uploadedFiles = req.files.map(file => {
      console.log("uploaded file name: ", file.originalname);
      console.log("file type: ", file.mimetype);
      console.log("file name in server folders: ", file.filename);
      console.log("file path in server folders: ", file.path);

      return new Promise((resolve, reject) => {
        bucket.upload(
          file.path,
          {
            destination: `tweetPictures/${file.filename}`, 
          },
          function (err, cloudFile) {
            if (!err) {
              cloudFile
                .getSignedUrl({
                  action: "read",
                  expires: "03-09-2999",
                })
                .then((urlData) => {
                  console.log("public downloadable url: ", urlData[0]);
                  // Remove the file from the server after uploading to the cloud
                  fs.unlinkSync(file.path);
                  resolve(urlData[0]);
                })
                .catch(reject);
            } else {
              console.log("err: ", err);
              reject(err);
            }
          }
        );
      });
    });

    Promise.all(uploadedFiles)
      .then(imageUrls => {
        let addProduct = new Stocks({

          carname: body.carname,
          make: body.make,
          model: body.model,
          bodys: body.bodys,
          milage : body.milage,
          description: body.description,
          
          year: body.year,
          color: body.color,
          fueltype : body.fueltype,
          gearbox: body.gearbox,
          door: body.door,
          enginetype: body.enginetype,
          enginesize : body.enginesize,
          mpg: body.mpg,
          height: body.height,
          length: body.length,
          width : body.width,
          co2emission: body.co2emission,
          ledlight: body.ledlight,
          navigation : body.navigation,
          coolingseats: body.coolingseats,
          soundsystem: body.soundsystem,
          airbags: body.airbags,
          backcamera : body.backcamera,
          parkingcamera: body.parkingcamera,

          traction: body.traction,
          antilockbreaks: body.antilockbreaks,
          aircondition : body.aircondition,
          climatecontrol: body.climatecontrol,
          sunroof: body.sunroof,
          price: body.price,
          installment : body.installment,
          installmentmonths: body.installmentmonths,
         
          imageUrl1: imageUrls[0], // Save the first image URL
          imageUrl2: imageUrls[1], // Save the second image URL
          imageUrl3: imageUrls[2], // Save the third image URL
          imageUrl4: imageUrls[3], // Save the fourth image URL
          imageUrl5: imageUrls[4], // Save the fifth image URL
          imageUrl6: imageUrls[5],

          // ... Other fields
        });

        addProduct.save().then(() => {
          res.send({
            message: "Product added successfully",
            data: addProduct,
          });
        });
      })
      .catch((error) => {
        console.error("Error uploading files:", error);
        res.status(500).send({
          message: "Server error",
        });
      });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send({
      message: "Server error",
    });
  }
});



app.post("/productrequestnew", upload.any(), (req, res) => {
  try {
    const body = req.body;


    console.log("req.body: ", req.body);
    console.log("req.files: ", req.files);
req.files.map((filee) => {
  console.log("uploaded file name: ", filee.originalname);
  console.log("uploaded file name: ", filee.originalname);
  console.log("file type: ", filee.mimetype);
  console.log("file name in server folders: ", filee.filename);
  console.log("file path in server folders: ", filee.path);
})


    bucket.upload(

      req.files[0].path,
      {
        destination: `tweetPictures/${req.files[0].filename}`, // give destination name if you want to give a certain name to file in bucket, include date to make name unique otherwise it will replace previous file with the same name
      },
      function (err, file, apiResponse) {
        if (!err) {
          file
            .getSignedUrl({
              action: "read",
              expires: "03-09-2999",
            })
            .then((urlData, err) => {
              if (!err) {
                console.log("public downloadable url: ", urlData[0]); // this is public downloadable url

                try {
                  fs.unlinkSync(req.files[0].path);
                  //file removed
                } catch (err) {
                  console.error(err);
                }

                let addPRoduct = new Stocks({
                  carname: body.carname,
                  make: body.make,
                  model: body.model,
                  bodys: body.bodys,
                  milage : body.milage,
                  imageUrl1: urlData[0],
                  description: body.description,
                  
                  year: body.year,
                  color: body.color,
                  fueltype : body.fueltype,
                  gearbox: body.gearbox,
                  door: body.door,
                  enginetype: body.enginetype,
                  enginesize : body.enginesize,
                  mpg: body.mpg,
                  height: body.height,
                  length: body.length,
                  width : body.width,
                  co2emission: body.co2emission,
                  ledlight: body.ledlight,
                  navigation : body.navigation,
                  coolingseats: body.coolingseats,
                  soundsystem: body.soundsystem,
                  airbags: body.airbags,
                  backcamera : body.backcamera,
                  parkingcamera: body.parkingcamera,

                  traction: body.traction,
                  antilockbreaks: body.antilockbreaks,
                  aircondition : body.aircondition,
                  climatecontrol: body.climatecontrol,
                  sunroof: body.sunroof,
                  price: body.price,
                  installment : body.installment,
                  installmentmonths: body.installmentmonths,
                 

                });

                addPRoduct.save().then((res) => {
                  // res.send(res)

                  console.log(res, "ProDUCT ADD");
                });

                
              }
            });
        } else {
          console.log("err: ", err);
          res.status(500).send();
        }
      }
    );
  } catch (error) {
    console.log("error: ", error);
  }
});


app.get("/stocksdisplay", async (req, res) => {
  try {
    const result1 = await Stocks.find({sold: false}).exec(); // Using .exec() to execute the query
    // console.log(result);
    res.send({
      message: "Got all Stocks successfully",
      data: result1,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Server error",
    });
  }
});
app.get("/stocksdisplaytrue", async (req, res) => {
  try {
    const result1 = await Stocks.find({sold: true}).exec(); // Using .exec() to execute the query
    // console.log(result);
    res.send({
      message: "Got all Stocks successfully",
      data: result1,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Server error",
    });
  } 
});
app.get("/api/v1/paginatpost", async (req, res) => {
  try {
    let query = Stocks.find({sold : false});

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * pageSize;
    const total = await Stocks.countDocuments();

    const pages = Math.ceil(total / pageSize);

    query = query.skip(skip).limit(pageSize);

    if (page > pages) {
      return res.status(404).json({
        status: "fail",
        message: "No page found",
      });
    }

    const result = await query;
    console.log(result);
    res.status(200).json({
      status: "success",
      count: result.length,
      page,
      pages: pages,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
});
app.delete("/stockdel/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedData = await Stocks.deleteOne({ _id: id });

    if (deletedData.deletedCount !== 0) {
      res.send({
        message: "Stock has been deleted successfully",
      });
    } else {
      res.status(404).send({
        message: "No mentor found with this id: " + id,
      });
    }
    console.log("id",id);
  } catch (err) {
    res.status(500).send({
      message: "Server error",
    });
  }
});
app.put("/edittedstock/:id", async (req,res) => {

  const UserID = req.params.id;
  const updatedUserData = req.body;

  try{
  const product = await Stocks.findByIdAndUpdate(UserID, updatedUserData, {
    new: true, 
  });
  if (!product) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(product);
}
catch {
  res.status(500).json({ message: 'Server Error' });
}
});
app.get("/singlestock/:id", async (req,res) => {     //chane name into id

  const productId = req.params.id;
  console.log('id',productId);
  const product = await Stocks.findOne({_id:productId});

  res.send({message: "product found", Product : product})


});
app.get("/soldmark/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const FindData = await Stocks.findById({ _id: id });

    if (FindData) {
     // FindData.isApproved = true;
   await FindData.updateOne({ sold: true });
      res.send({
        message: "Product has been set as sold successfully",
        data : FindData,
      });
    } else {
      res.status(404).send({
        message: "No Product found with this id: " + id,
      });
    }
    console.log("data",FindData);
    console.log("id",id);
  } catch (err) {
    res.status(500).send({
      message: "Server error",
    });
  }

});

app.get("/api/search", async (req, res) => {
  const searchParams = {};
      console.log("src",req.query)

  // Check if query parameters exist and add them to the search parameters
  if (req.query.make) {
    searchParams.make = new RegExp(req.query.make, "i");
  }

  if (req.query.year) {
    searchParams.year = new RegExp(req.query.year, "i");
  }

  if (req.query.price) {
    // Assuming price is a number, you might need to adjust the logic based on your data
    searchParams.price = req.query.price;
  }

  try {
    const results = await Stocks.find(searchParams);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
