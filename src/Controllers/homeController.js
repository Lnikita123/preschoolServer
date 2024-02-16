const homeModel = require("../Models/homeModal");
const homeData = async (req, res) => {
  try {
    const { id, Heading, Description, Photos, Published, Link } = req.body;

    const newData = await homeModel.findOneAndUpdate(
      { id }, // Query to find the document
      { id, Heading, Description, Photos, Published, Link }, // The data to be updated or inserted
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
const getData = async (req, res) => {
  try {
    const homeData = await homeModel.findOne({ isDeleted: false });
    res.status(200).send({
      status: true,
      msg: "homeData retrieved succesfully",
      data: homeData,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const getById = async (req, res) => {
  const homeId = req.params.homeId;
  const homeData = await homeModel.findOne({
    homeId: homeId,
    isDeleted: false,
  });
  return res
    .status(200)
    .send({ status: true, msg: "Data fetch succesfully", data: homeData });
};

const updateData = async (req, res) => {
  try {
    let data = req.body;
    const { Published } = data;
    let homeId = req.params.homeId;
    const existingUnit = await homeModel.findOne({
      Published,
      id: { $ne: homeId },
    });
    let updateBody = await homeModel.findOneAndUpdate(
      { id: homeId },
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
const Deletedata = async (req, res) => {
  try {
    const result = await homeModel.deleteMany({});
    res.send(`Deleted ${result.deletedCount} homedata`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const DeleteById = async (req, res) => {
  try {
    let homeId = req.params.homeId;

    // Convert homeId to Number as your id in schema is of type Number
    homeId = Number(homeId);

    // Check if the document exists and is not deleted
    const page = await homeModel.findOne({
      id: homeId,
      isDeleted: false,
    });
    if (!page) {
      return res
        .status(404)
        .send({ status: false, message: `Page not found or already deleted` });
    }

    // Perform the hard delete
    await homeModel.findOneAndDelete({ id: homeId });

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
  homeData,
  getData,
  getById,
  updateData,
  Deletedata,
  DeleteById,
};
