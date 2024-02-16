const admissionModel = require("../Models/admissionModel");
const multer = require("multer");
const upload = multer();
const admissionData = async (req, res) => {
  try {
    const { _id, id, Photo, Published, Description } = req.body;

    if (!Photo) {
      throw new Error("No image data provided");
    }

    // Setting the upsert option to true will create a new document if one doesn't exist.
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    let query = {};
    if (_id) {
      // Use the provided _id in the query if it exists
      query._id = _id;
    }

    // The update object is what you want to save or update in the document
    const update = {
      id,
      Photo,
      Published,
      Description,
    };

    // Find a document with the provided _id (if it exists) and update it with the new values.
    // If a document with the provided _id does not exist or no _id is provided, create a new document.
    const updatedData = await admissionModel.findOneAndUpdate(
      query,
      update,
      options
    );

    return res.status(200).send({
      status: true,
      msg: "Data created or updated successfully",
      data: updatedData,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "Server error", error: err.message });
  }
};

const getadmissionData = async (req, res) => {
  try {
    const admissionData = await admissionModel.findOne({ isDeleted: false });
    res.status(200).send({
      status: true,
      msg: "admissionData retrieved succesfully",
      data: admissionData,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const getadmissionById = async (req, res) => {
  const admissionId = req.params.admissionId;
  const admissionData = await admissionModel.findOne({
    admissionId: admissionId,
    isDeleted: false,
  });
  return res
    .status(200)
    .send({ status: true, msg: "Data fetch succesfully", data: admissionData });
};

const updateadmissionData = async (req, res) => {
  try {
    let data = req.body;
    const { Published } = data;
    let admissionId = req.params.admissionId;

    const existingUnit = await admissionModel.findOne({
      Published,
      id: { $ne: admissionId },
    });
    let updateBody = await admissionModel.findOneAndUpdate(
      { id: admissionId },
      {
        $set: {
          Published: Published,
        },
      },
      { new: true }
    );
    return res.status(200).send({
      status: true,
      messege: "Data updated successfully",
      data: updateBody,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

//Delete all data
const Deleteadmissiondata = async (req, res) => {
  try {
    const result = await admissionModel.deleteMany({});
    res.send(`Deleted ${result.deletedCount} admissionData`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const DeleteadmissionById = async (req, res) => {
  try {
    let admissionId = req.params.admissionId;

    // Convert admissionId to Number as your id in schema is of type Number
    admissionId = Number(admissionId);

    // Check if the document exists and is not deleted
    const page = await admissionModel.findOne({
      id: admissionId,
      isDeleted: false,
    });
    if (!page) {
      return res
        .status(404)
        .send({ status: false, message: `Page not found or already deleted` });
    }

    // Perform the hard delete
    await admissionModel.findOneAndDelete({ id: admissionId });

    return res
      .status(200)
      .send({ status: true, message: `Data deleted successfully.` });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "Server error", error: err.message });
  }
};

module.exports = {
  admissionData,
  getadmissionData,
  getadmissionById,
  updateadmissionData,
  Deleteadmissiondata,
  DeleteadmissionById,
};
