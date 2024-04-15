const express = require("express");
const router = express.Router();
const multer = require("multer");
const Middleware = require("../middleware/authorization")
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
} = require("../Controllers/homecontactController");

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
  userHomeHomeData,
  getuserHomeHomeData,
  updateuserHomeHomeData,
  DeleteuserHomeHomedata,
} = require("../Controllers/userHomeController");

//userHome
router.post("/usercontactHomeData", userHomeHomeData);
router.get("/getcontactHomeData", getuserHomeHomeData);
router.put("/updatecontactHomeData/:userHomeId", updateuserHomeHomeData);
router.delete("/DeletecontactHomedata", DeleteuserHomeHomedata);

//Home//
router.post("/createData", upload.single("Photo"), Middleware.loginCheck, homeData);
router.get("/getHomeData", getData);
router.get("/getById/:homeId", getById);
router.put("/updateData/:homeId", upload.single("Photo"), Middleware.loginCheck, updateData);
router.delete("/deleteData", Deletedata);
router.delete("/deleteId/:homeId", Middleware.loginCheck, DeleteById);

//contact//
router.post("/contactData", StudentContacts);
router.get("/getcontactData", getAllContacts);
router.get("/getcontactById/:contactId", getContactById);
router.put("/updateContactData/:contactId", updateContact);
router.delete("/deletecontactData", deleteContact);
router.delete("/DeleteContactdat", DeleteContactdata);

//Teacher
router.post("/createteacherData", upload.single("Photo"), Middleware.loginCheck, teacherData);
router.get("/getteacherData", getteacherData);
router.get("/getteacherById/:teacherId", getteacherById);
router.put(
  "/updateteacherData/:teacherId",
  upload.single("Photo"), Middleware.loginCheck,
  updateteacherData
);
router.delete("/deleteteacherData", Deleteteacherdata);
router.delete("/deleteteacherId/:teacherId", Middleware.loginCheck, DeleteteacherById);

//About//
router.post("/createaboutData", upload.single("Photo"), Middleware.loginCheck, aboutData);
router.get("/getaboutData", getaboutData);
router.get("/getaboutById/:aboutId", getaboutById);
router.put(
  "/updataabouteData/:aboutId",
  upload.single("Photo"), Middleware.loginCheck,
  updateaboutData
);
router.delete("/deleteaboutData", Deleteaboutdata);
router.delete("/deleteaboutId/:aboutId", Middleware.loginCheck, DeleteaboutById);

//Admission
router.post("/createadmissionData", upload.single("Photo"), Middleware.loginCheck, admissionData);
router.get("/getadmissionData", getadmissionData);
router.get("/getadmissionById/:admissionId", getadmissionById);
router.put(
  "/updateadmissionData/:admissionId", Middleware.loginCheck,
  upload.single("Photo"),
  updateadmissionData
);
router.delete("/deleteadmissionData", Deleteadmissiondata);
router.delete("/deleteadmissionId/:admissionId", Middleware.loginCheck, DeleteadmissionById);

//program

router.post("/createprogramData", upload.single("Photo"), Middleware.loginCheck, programData);
router.get("/getprogramData", getprogramData);
router.get("/getprogramById/:programId", getprogramById);
router.put(
  "/updataprogrameData/:programId", Middleware.loginCheck,
  upload.single("Photo"),
  updateprogramData
);
router.delete("/deleteprogramData", Deleteprogramdata);
router.delete("/deleteprogramId/:programId", Middleware.loginCheck, DeleteprogramById);

//AddProgramData//
router.post("/createaddProgramData", upload.single("Photo"), Middleware.loginCheck, addProgramData);
router.get("/getaddProgramData", getaddProgramData);
router.get("/getaddProgramById/:addProgramId", getaddProgramById);
router.put(
  "/updataaddProgrameData/:addProgramId", Middleware.loginCheck,
  upload.single("Photo"),
  updateaddProgramData
);
router.delete("/deleteaddProgramData", DeleteaddProgramdata);
router.delete("/deleteaddProgramId/:addProgramId", Middleware.loginCheck, DeleteaddProgramById);

//Curriculum//
router.post("/createcurriculumData", upload.single("Photo"), Middleware.loginCheck, curriculumData);
router.get("/getcurriculumData", getcurriculumData);
router.get("/getcurriculumById/:curriculumId", getcurriculumById);
router.put(
  "/updatacurriculumeData/:curriculumId",
  upload.single("Photo"), Middleware.loginCheck,
  updatecurriculumData
);
router.delete("/deletecurriculumData", Deletecurriculumdata);
router.delete("/deletecurriculumId/:curriculumId", Middleware.loginCheck, DeletecurriculumById);

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


//user
const {
  createUser,
  userLogin,
  getusersData,
} = require("../Controllers/loginController");
//user Login
router.post("/createUser", createUser);
router.post("/Loginuser", userLogin);
router.get("/getusersData", getusersData);
module.exports = router;
