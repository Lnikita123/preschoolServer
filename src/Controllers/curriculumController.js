const curriculumModel = require("../Models/curriculumModel");
const multer = require("multer");
const upload = multer();
const curriculumData = async (req, res) => {
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
    const updatedData = await curriculumModel.findOneAndUpdate(
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

const getcurriculumData = async (req, res) => {
  try {
    const curriculumData = await curriculumModel.findOne({ isDeleted: false });
    res.status(200).send({
      status: true,
      msg: "curriculumData retrieved succesfully",
      data: curriculumData,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const getcurriculumById = async (req, res) => {
  const curriculumId = req.params.curriculumId;
  const curriculumData = await curriculumModel.findOne({
    curriculumId: curriculumId,
    isDeleted: false,
  });
  return res.status(200).send({
    status: true,
    msg: "Data fetch succesfully",
    data: curriculumData,
  });
};

const updatecurriculumData = async (req, res) => {
  try {
    let data = req.body;
    const { Published } = data;
    let curriculumId = req.params.curriculumId;

    const existingUnit = await curriculumModel.findOne({
      Published,
      id: { $ne: curriculumId },
    });
    let updateBody = await curriculumModel.findOneAndUpdate(
      { id: curriculumId },
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
const Deletecurriculumdata = async (req, res) => {
  try {
    const result = await curriculumModel.deleteMany({});
    res.send(`Deleted ${result.deletedCount} curriculumData`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const DeletecurriculumById = async (req, res) => {
  try {
    let curriculumId = req.params.curriculumId;

    const page = await curriculumModel.findOne({ curriculumId: curriculumId });
    if (!page) {
      return res.status(400).send({ status: false, message: `page not Found` });
    }
    if (page.isDeleted == false) {
      await curriculumModel.findOneAndUpdate(
        { curriculumId: curriculumId },
        { $set: { isDeleted: true, deletedAt: new Date() } }
      );

      return res
        .status(200)
        .send({ status: true, message: `Data deleted successfully.` });
    }
    return res
      .status(400)
      .send({ status: true, message: `Data has been already deleted.` });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};
module.exports = {
  curriculumData,
  getcurriculumData,
  getcurriculumById,
  updatecurriculumData,
  Deletecurriculumdata,
  DeletecurriculumById,
};
