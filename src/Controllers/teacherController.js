const teacherModel = require("../Models/teacherModel");
const teacherData = async (req, res) => {
  try {
    const { id, Name, Education, Photos, Published } = req.body;

    const newData = await teacherModel.findOneAndUpdate(
      { id }, // Query to find the document
      { id, Name, Education, Photos, Published }, // The data to be updated or inserted
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
const getteacherData = async (req, res) => {
  try {
    const teacherData = await teacherModel.find({ isDeleted: false });
    res.status(200).send({
      status: true,
      msg: "teacherData retrieved succesfully",
      data: teacherData,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const getteacherById = async (req, res) => {
  const teacherId = req.params.teacherId;
  const teacherData = await teacherModel.findOne({
    teacherId: teacherId,
    isDeleted: false,
  });
  return res.status(200).send({
    status: true,
    msg: "Data fetch succesfully",
    data: teacherData,
  });
};

const updateteacherData = async (req, res) => {
  try {
    let data = req.body;
    const { Published } = data;
    let teacherId = req.params.teacherId;
    const existingUnit = await teacherModel.findOne({
      Published,
      id: { $ne: teacherId },
    });
    let updateBody = await teacherModel.findOneAndUpdate(
      { id: teacherId },
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
const Deleteteacherdata = async (req, res) => {
  try {
    const result = await teacherModel.deleteMany({});
    res.send(`Deleted ${result.deletedCount} teacherdata`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const DeleteteacherById = async (req, res) => {
  try {
    let teacherId = req.params.teacherId;

    // Convert teacherId to Number as your id in schema is of type Number
    teacherId = Number(teacherId);

    // Check if the document exists and is not deleted
    const page = await teacherModel.findOne({
      id: teacherId,
      isDeleted: false,
    });
    if (!page) {
      return res
        .status(404)
        .send({ status: false, message: `Page not found or already deleted` });
    }

    // Perform the hard delete
    await teacherModel.findOneAndDelete({ id: teacherId });

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
  teacherData,
  getteacherData,
  getteacherById,
  updateteacherData,
  Deleteteacherdata,
  DeleteteacherById,
};
