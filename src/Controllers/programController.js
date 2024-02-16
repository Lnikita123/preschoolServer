const programModel = require("../Models/programModel");
const multer = require("multer");
const upload = multer();
const programData = async (req, res) => {
  try {
    const { _id, id, Photo, Published } = req.body;

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
    };

    // Find a document with the provided _id (if it exists) and update it with the new values.
    // If a document with the provided _id does not exist or no _id is provided, create a new document.
    const updatedData = await programModel.findOneAndUpdate(
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

const getprogramData = async (req, res) => {
  try {
    const programData = await programModel.findOne({ isDeleted: false });
    res.status(200).send({
      status: true,
      msg: "programData retrieved succesfully",
      data: programData,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const getprogramById = async (req, res) => {
  const programId = req.params.programId;
  const programData = await programModel.findOne({
    programId: programId,
    isDeleted: false,
  });
  return res
    .status(200)
    .send({ status: true, msg: "Data fetch succesfully", data: programData });
};

const updateprogramData = async (req, res) => {
  try {
    let data = req.body;
    const { Published } = data;
    let programId = req.params.programId;

    const existingUnit = await programModel.findOne({
      Published,
      id: { $ne: programId },
    });
    let updateBody = await programModel.findOneAndUpdate(
      { id: programId },
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
const Deleteprogramdata = async (req, res) => {
  try {
    const result = await programModel.deleteMany({});
    res.send(`Deleted ${result.deletedCount} programData`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const DeleteprogramById = async (req, res) => {
  try {
    let programId = req.params.programId;

    // Convert programId to Number as your id in schema is of type Number
    programId = Number(programId);

    // Check if the document exists and is not deleted
    const page = await programModel.findOne({
      id: programId,
      isDeleted: false,
    });
    if (!page) {
      return res
        .status(404)
        .send({ status: false, message: `Page not found or already deleted` });
    }

    // Perform the hard delete
    await programModel.findOneAndDelete({ id: programId });

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
  programData,
  getprogramData,
  getprogramById,
  updateprogramData,
  Deleteprogramdata,
  DeleteprogramById,
};
