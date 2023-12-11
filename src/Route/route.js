const express = require("express");
const router = express.Router();
const multer = require("multer");
// const Middleware = require("../middleware/authorization");
const storage = multer.memoryStorage(); // using memory storage for simplicity
const upload = multer({ storage: storage });
const {
  homeData,
  getData,
  getById,
  updateData,
  Deletedata,
  DeleteById,
} = require("../Controllers/homeController");

const {
  teacherData,
  getteacherData,
  getteacherById,
  updateteacherData,
  Deleteteacherdata,
  DeleteteacherById,
} = require("../Controllers/teacherController");

const {
  aboutData,
  getaboutData,
  getaboutById,
  updateaboutData,
  Deleteaboutdata,
  DeleteaboutById,
} = require("../Controllers/aboutController");

const {
  admissionData,
  getadmissionData,
  getadmissionById,
  updateadmissionData,
  Deleteadmissiondata,
  DeleteadmissionById,
} = require("../Controllers/admissionController");

const {
  programData,
  getprogramData,
  getprogramById,
  updateprogramData,
  Deleteprogramdata,
  DeleteprogramById,
} = require("../Controllers/programController");

const {
  addProgramData,
  getaddProgramData,
  getaddProgramById,
  updateaddProgramData,
  DeleteaddProgramdata,
  DeleteaddProgramById,
} = require("../Controllers/addProgramController");

const {
  curriculumData,
  getcurriculumData,
  getcurriculumById,
  updatecurriculumData,
  Deletecurriculumdata,
  DeletecurriculumById,
} = require("../Controllers/curriculumController");
const {
  StudentContacts,
  getAllContacts,
  getContactById,
  deleteContact,
  DeleteContactdata,
  updateContact,
} = require("../Controllers/contactController");

const {
  contacpageData,
  getcontacpageData,
  getcontacpageById,
  updatecontacpageData,
  Deletecontacpagedata,
  DeletecontacpageById,
} = require("../Controllers/CotactpageController");

//**********************************user*******************************//

const {
  StudentcontactEmails,
  getAllcontactEmails,
  getcontactEmailById,
  deletecontactEmail,
  DeletecontactEmaildata,
  updatecontactEmail,
} = require("../Controllers/contactEmailController");

//Home//
router.post("/createData", upload.single("Photo"), homeData);
router.get("/getData", getData);
router.get("/getById/:homeId", getById);
router.put("/updateData/:homeId", upload.single("Photo"), updateData);
router.delete("/deleteData", Deletedata);
router.delete("/deleteId/:homeId", DeleteById);

//contact//
router.post("/contactData", StudentContacts);
router.get("/getcontactData", getAllContacts);
router.get("/getcontactById/:contactId", getContactById);
router.put("/updateContactData/:contactId", updateContact);
router.delete("/deletecontactData", deleteContact);
router.delete("/DeleteContactdat", DeleteContactdata);

//Teacher
router.post("/createteacherData", upload.single("Photo"), teacherData);
router.get("/getteacherData", getteacherData);
router.get("/getteacherById/:teacherId", getteacherById);
router.put(
  "/updateteacherData/:teacherId",
  upload.single("Photo"),
  updateteacherData
);
router.delete("/deleteteacherData", Deleteteacherdata);
router.delete("/deleteteacherId/:teacherId", DeleteteacherById);

//About//
router.post("/createaboutData", upload.single("Photo"), aboutData);
router.get("/getaboutData", getaboutData);
router.get("/getaboutById/:aboutId", getaboutById);
router.put(
  "/updataabouteData/:aboutId",
  upload.single("Photo"),
  updateaboutData
);
router.delete("/deleteaboutData", Deleteaboutdata);
router.delete("/deleteaboutId/:aboutId", DeleteaboutById);

//Admission
router.post("/createadmissionData", upload.single("Photo"), admissionData);
router.get("/getadmissionData", getadmissionData);
router.get("/getadmissionById/:admissionId", getadmissionById);
router.put(
  "/updateadmissionData/:aboutId",
  upload.single("Photo"),
  updateadmissionData
);
router.delete("/deleteadmissionData", Deleteadmissiondata);
router.delete("/deleteadmissionId/:admissionId", DeleteadmissionById);

//program

router.post("/createprogramData", upload.single("Photo"), programData);
router.get("/getprogramData", getprogramData);
router.get("/getprogramById/:programId", getprogramById);
router.put(
  "/updataprogrameData/:programId",
  upload.single("Photo"),
  updateprogramData
);
router.delete("/deleteprogramData", Deleteprogramdata);
router.delete("/deleteprogramId/:programId", DeleteprogramById);

//AddProgramData//
router.post("/createaddProgramData", upload.single("Photo"), addProgramData);
router.get("/getaddProgramData", getaddProgramData);
router.get("/getaddProgramById/:addProgramId", getaddProgramById);
router.put(
  "/updataaddProgrameData/:addProgramId",
  upload.single("Photo"),
  updateaddProgramData
);
router.delete("/deleteaddProgramData", DeleteaddProgramdata);
router.delete("/deleteaddProgramId/:addProgramId", DeleteaddProgramById);

//Curriculum//
router.post("/createcurriculumData", upload.single("Photo"), curriculumData);
router.get("/getcurriculumData", getcurriculumData);
router.get("/getcurriculumById/:curriculumId", getcurriculumById);
router.put(
  "/updatacurriculumeData/:curriculumId",
  upload.single("Photo"),
  updatecurriculumData
);
router.delete("/deletecurriculumData", Deletecurriculumdata);
router.delete("/deletecurriculumId/:curriculumId", DeletecurriculumById);

//contactPage
router.post("/contactpageData", upload.single("Photo"), contacpageData);
router.get("/getcontactpageData", getcontacpageData);
router.get("/getcontactpageById/:contactpageId", getcontacpageById);
router.put(
  "/updatecontactpageData/:contactpageId",
  upload.single("Photo"),
  updatecontacpageData
);
router.delete("/Deletecontactpagedata", Deletecontacpagedata);
router.delete("/DeletecontactpageById/:contactpageId", DeletecontacpageById);

//contactEmail//
router.post("/contactEmailData", StudentcontactEmails);
router.get("/getcontactEmailData", getAllcontactEmails);
router.get("/getcontactEmailById/:contactEmailId", getcontactEmailById);
router.put("/updateContactEmailData/:contactEmailId", updatecontactEmail);
router.delete("/deletecontactEmailData", deletecontactEmail);
router.delete("/DeleteContactEmaildat", DeletecontactEmaildata);
module.exports = router;
