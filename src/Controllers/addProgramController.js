const addProgramModel = require("../Models/addprogramModel");
const addProgramData = async (req, res) => {
  try {
    const { id, Heading, Description, Photos, Published } = req.body;

    const newData = await addProgramModel.findOneAndUpdate(
      { id }, // Query to find the document
      { id, Heading, Description, Photos, Published }, // The data to be updated or inserted
      {
        new: true,
        upsert: true,
      }
    );

    return res.status(201).send({
      status: true,
      msg: "Data created or updated successfully",
      data: newData,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "Server error", error: err.message });
  }
};
const getaddProgramData = async (req, res) => {
  try {
    const addProgramData = await addProgramModel.find({ isDeleted: false });
    res.status(200).send({
      status: true,
      msg: "addProgramData retrieved succesfully",
      data: addProgramData,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const getaddProgramById = async (req, res) => {
  const addProgramId = req.params.addProgramId;
  const addProgramData = await addProgramModel.findOne({
    addProgramId: addProgramId,
    isDeleted: false,
  });
  return res.status(200).send({
    status: true,
    msg: "Data fetch succesfully",
    data: addProgramData,
  });
};

const updateaddProgramData = async (req, res) => {
  try {
    let data = req.body;
    const { Published } = data;
    let addProgramId = req.params.addProgramId;
    const existingUnit = await addProgramModel.findOne({
      Published,
      id: { $ne: addProgramId },
    });
    let updateBody = await addProgramModel.findOneAndUpdate(
      { id: addProgramId },
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
const DeleteaddProgramdata = async (req, res) => {
  try {
    const result = await addProgramModel.deleteMany({});
    res.send(`Deleted ${result.deletedCount} addProgramdata`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};
const DeleteaddProgramById = async (req, res) => {
  try {
    let addProgramId = req.params.addProgramId;

    const page = await addProgramModel.findOne({ addProgramId: addProgramId });
    if (!page) {
      return res.status(400).send({ status: false, message: `page not Found` });
    }
    if (page.isDeleted == false) {
      await addProgramModel.findOneAndUpdate(
        { addProgramId: addProgramId },
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
  addProgramData,
  getaddProgramData,
  getaddProgramById,
  updateaddProgramData,
  DeleteaddProgramdata,
  DeleteaddProgramById,
};
