//importing modules...
import express from "express";
import aws from "aws-sdk";
import multer from "multer";

//importing Image schema...
import { Imagemodel } from "../../Databases/Allmodels";
import { s3Upload } from "../../Utils/s3";
import { validateId } from "../../Validation/CommonValidation";

const Router = express.Router();

//Storage in the memory storage(RAM).
const storage = multer.memoryStorage();
//for uploading taking data from storage through multer.
const upload = multer({ storage });

/**
 * Route     /:_id
 * Des       Getting image on the basis of image's ID
 * Params    none
 * Access    Public
 * Method    GET
 */
Router.get("/:_id", async (req, res) => {
  try {
    await validateId(req.params);
    const { _id } = req.params;

    const image = await Imagemodel.findById(_id);
    if (image.length === 0) {
      return res.status(404).json({ message: "No details found" });
    }
    return res.status(200).json({ image });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route     /
 * Des       Uploading images from the body to the database.
 * Params    none
 * Access    Public
 * Method    POST
 */
Router.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    //Access List
    const buketOptions = {
      Bucket: "zomato-clone-busket",
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read",
    };
    //Getting images from s3 buket and after that uploading to the MongoDB database.
    const uploadImage = await s3Upload(buketOptions);
    const DBUpload = await Imagemodel.create({
      images: [
        {
          location: uploadImage.Location,
        },
      ],
    });
    return res.status(200).json({ DBUpload });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
